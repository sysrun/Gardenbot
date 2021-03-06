/*global Backbone,Router,io,templateLoader,HeaderBar,DashboardView,MapView*/
'use strict';

var app;

window.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'map': 'map'
  },

  initialize: function () {
    this.socket = io.connect('http://localhost');
    this.socket.on('news', function (data) {
      console.log(data);
      this.socket.emit('my other event', { my: 'data' });
    });

    this.socket.on('mavlinkdata', this.onMavlinkData);
    this.headerBar = new HeaderBar();
  },

  onMavlinkData: function (data) {
    //console.log('onMavlinkData', data);
    switch (data.name) {
    case 'VOLTAGECURRENT':
      app.dashboardView.gauges.gaugeVoltage.setValueAnimated(data.voltage / 100);
      app.dashboardView.gauges.gaugeAmpLeft.setValue(data.cur_left / 100);
      app.dashboardView.gauges.gaugeAmpRight.setValue(data.cur_right / 100);
      app.dashboardView.gauges.gaugeAmpCombined.setValue((data.cur_left / 100) + (data.cur_right / 100));
      break;
    case 'DHT11_DATA':
      app.dashboardView.gauges.gaugeTemp.setValueAnimated(data.temperature_celsius);
      app.dashboardView.gauges.gaugeHum.setValueAnimated(data.humidity_percent);
      break;
    case 'SABERTOOTH':
      app.dashboardView.gauges.gaugeDrive.setValue(data.drive);
      app.dashboardView.gauges.gaugeTurn.setValue(data.turn * -1);
      break;
    case 'RC_CHANNELS_RAW':
      app.dashboardView.gauges.RC_CHAN_1.refresh(data.chan1_raw);
      app.dashboardView.gauges.RC_CHAN_2.refresh(data.chan2_raw);
      app.dashboardView.gauges.RC_CHAN_3.refresh(data.chan3_raw);
      app.dashboardView.gauges.RC_CHAN_4.refresh(data.chan4_raw);
      app.dashboardView.gauges.RC_CHAN_5.refresh(data.chan5_raw);
      app.dashboardView.gauges.RC_CHAN_6.refresh(data.chan6_raw);
      app.dashboardView.gauges.RC_CHAN_7.refresh(data.chan7_raw);
      app.dashboardView.gauges.RC_CHAN_8.refresh(data.chan8_raw);
      break;
    }

  },

  home: function () {
    this.headerBar.setActive('menu-dashboard');
    if (!this.dashboardView) {
      this.dashboardView = new DashboardView();
    }
    $('#content').html(this.dashboardView.el);
    this.dashboardView.render();
  },

  map: function () {
    this.headerBar.setActive('menu-map');
    if (!this.mapView) {
      this.mapView = new MapView();
      this.mapView.render();
    }
    $('#content').html(this.mapView.el);
  }
});

/*
$(function() {
  app = new Router();
  Backbone.history.start();
});
*/

var templates = [
  'MapView',
  'DashboardView'
];
$(function () {
  templateLoader.load(templates, function () {
    app = new Router();
    Backbone.history.start();
  });
});
