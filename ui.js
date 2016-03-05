/**
 * Created by Adam on 04/03/2016.
 */
var $ = jQuery = require('jquery');
var uiRemote = require('electron').remote;
var uiDialog = uiRemote.require('electron').dialog;
var uiShell = require('electron').shell;
$(function(){

  function close(){
    window.close();
  }
  function reset(){
    location.href = location.href;
  }
  $('.close-button').on('click', close);
  $('.reset').on('click', reset);

  function setupPage1(){
    "use strict";

    var $choose = $('#choose-files'),
      $notify = $('.notify'),
      $dir = $('#choose-dir'),
      $gate = $('#gateway input[name="gateway"]'),
      $file = $('.dropper');

    $choose['cupState'] = (function(){
      var file = false,
        dir = false,
        gate= "Stripe";
      function ready(){
        return !!(file && dir && gate);
      }
      function getSets(){
        if (ready()){
          return {file:file,dir:dir,gate:gate};
        }
        return {file:file,dir:dir,gate:gate};
      }
      function reset(){
        file = false;
        gate = false;
      }
      function setDir(val){
        dir = val || false;
      }
      function setFile(val){
        file = val || false;
      }
      function setGate(val){
        gate = val || false;
      }

      return{
        isReady: ready,
        getSettings: getSets,
        resetSettings: reset,
        setFile : setFile,
        setDirectory : setDir,
        setGateway : setGate
      };
    })();

    function afterProcess (array){
      var files = array.join('<br/>');
      $notify.html("Process complete. <br/>"+files);

    }
    function doNext(){
      var p1 = $('#choose-files').addClass('out').removeClass('in');
      $('#processing-files').addClass('in');
      setTimeout(function(){
        p1.removeClass('out');
      }, 1000);
      setupPage2($choose.cupState.getSettings(), afterProcess);
    }

    window.ondragover = function(e) { e.preventDefault(); return false };
    window.ondrop = function(e) { e.preventDefault(); return false };
    $file.on('dragover', function () { $file.addClass('dragover'); return false; });
    $file.on('dragleave', function () { $file.removeClass('dragover'); return false; });
    $file.on('drop', function (e) {
      e.preventDefault();
      $file.removeClass('dragover').addClass('dropped');
      var file = e.originalEvent.dataTransfer.files[0].path;
      $file.find('p').addClass('hasFile').text(file);
      $choose.cupState.setFile(file);
      $choose.trigger('ifReady');
      return false;
    });

    $dir.on('click', function(e){
      e.preventDefault();
      var dir = uiDialog.showOpenDialog({ properties: [ 'openDirectory']});
      if(dir.length && typeof dir[0] === 'string'){
        $choose.cupState.setDirectory(dir[0]);
        $('.dir-output').text(dir[0]);
      }
      $choose.trigger('ifReady');
    });

    $gate.on('change', function(e){
      $choose.cupState.setGateway(this.value);
      $choose.trigger('ifReady');
    });
    $choose.on('ifReady', function(){
      var n;
      if($choose.cupState.isReady()){
        n = $('.next').one('click', doNext)[0];
        n.disabled = false;
      }
      else{
        n = $('.next')[0];
        n.removeEventListener('click');
        n.disabled = true;
      }
    });

  }

  function setupPage2(info, callback){
    "use strict";

    var cup = new require('uplift-csv-cup');

    $('.open-dir').on('click', function(){
      uiShell.showItemInFolder(info.dir);
    });

    setTimeout(function(){
      cup(info.gate, "Engaging Networks", info.dir, info.file, callback);
    }, 2000);

  }

  setupPage1();

});