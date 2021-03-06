/*global steelseries, Backbone, JustGage*/
'use strict';
window.DashboardView = Backbone.View.extend({

  initialize: function () {
    console.log('Initializing Dashboard View');
    this.gauges = {};
  },

  render: function () {
    $(this.el).html(this.template());
    this.initGauges();
    return this;
  },

  initGauges: function () {
    var ampAreas = [
      steelseries.Section(0, 15, 'rgba(0, 220, 0, 0.2)'),
      steelseries.Section(15, 25, 'rgba(255, 245, 90, 0.3)'),
      steelseries.Section(25, 30, 'rgba(220, 0, 0, 0.3)')
    ];

    var bgType = steelseries.BackgroundColor.BRUSHED_STAINLESS;

    this.gauges.gaugeAmpLeft = new steelseries.Radial('gauge_ampleft', {
      gaugeType: steelseries.GaugeType.TYPE5,
      size: 171,
      minValue: 0,
      maxValue: 30,
      backgroundColor: bgType,
      //section: sections,
      area: ampAreas,
      titleString: 'Motor Left',
      unitString: 'Ampere',
      threshold: 25,
      lcdVisible: true,
      lcdDecimals: 1,
      frameVisible: false
    });

    this.gauges.gaugeAmpRight = new steelseries.Radial('gauge_ampright', {
      gaugeType: steelseries.GaugeType.TYPE5,
      size: 171,
      minValue: 0,
      maxValue: 30,
      backgroundColor: bgType,
      //section: sections,
      area: ampAreas,
      titleString: 'Motor Right',
      unitString: 'Ampere',
      threshold: 25,
      lcdVisible: true,
      lcdDecimals: 1,
      frameVisible: false
    });

    var combinedAmpAreas = [
      steelseries.Section(0, 30, 'rgba(0, 220, 0, 0.2)'),
      steelseries.Section(30, 40, 'rgba(255, 245, 90, 0.3)'),
      steelseries.Section(40, 50, 'rgba(220, 0, 0, 0.3)')
    ];

    this.gauges.gaugeAmpCombined = new steelseries.Radial('gauge_ampere', {
      gaugeType: steelseries.GaugeType.TYPE5,
      size: 171,
      minValue: 0,
      maxValue: 50,
      backgroundColor: bgType,
      area: combinedAmpAreas,
      thresholdVisible: false,
      ledVisible: false,
      userLedVisible: false,
      titleString: 'Combined',
      unitString: 'Ampere',
      lcdVisible: true,
      lcdDecimals: 1,
      frameVisible: false
    });

    var sections = [
      steelseries.Section(20, 22, 'rgba(0, 0, 220, 0.3)'),
      steelseries.Section(22, 26, 'rgba(0, 220, 0, 0.3)'),
      steelseries.Section(26, 28, 'rgba(220, 220, 0, 0.3)')
    ];

    this.gauges.gaugeVoltage = new steelseries.RadialBargraph('gauge_voltage', {
      gaugeType: steelseries.GaugeType.TYPE2,
      size: 171,
      minValue: 20,
      maxValue: 28,
      backgroundColor: bgType,
      section: sections,
      thresholdRising: false,
      titleString: 'Voltage',
      unitString: 'V',
      lcdVisible: true,
      lcdDecimals: 1,
      frameVisible: false

      /*,
      playAlarm:true,
      alarmSound: 'js/alarm.mp3'
      */
    });

    //gaugeVoltage.setMaxMeasuredValue(25);
    this.gauges.gaugeVoltage.setValueAnimated(24.5);

    this.gauges.gaugeTemp = new steelseries.RadialBargraph('gauge_temp', {
      gaugeType: steelseries.GaugeType.TYPE2,
      size: 171,
      minValue: 0,
      maxValue: 40,
      backgroundColor: bgType,
      section: sections,
      thresholdRising: false,
      titleString: 'Temperature',
      unitString: '°C',
      lcdVisible: true,
      lcdDecimals: 0,
      frameVisible: false,
      thresholdVisible: false,
      ledVisible: false,
      userLedVisible: false

      /*,
      playAlarm:true,
      alarmSound: 'js/alarm.mp3'
      */
    });

    this.gauges.gaugeHum = new steelseries.RadialBargraph('gauge_hum', {
      gaugeType: steelseries.GaugeType.TYPE2,
      size: 171,
      minValue: 30,
      maxValue: 90,
      backgroundColor: bgType,
      section: sections,
      thresholdRising: false,
      titleString: 'Himidity',
      unitString: '%',
      lcdVisible: true,
      lcdDecimals: 0,
      frameVisible: false,
      thresholdVisible: false,
      ledVisible: false,
      userLedVisible: false

      /*,
      playAlarm:true,
      alarmSound: 'js/alarm.mp3'
      */
    });

    this.gauges.gaugeDrive = new steelseries.Radial('gauge_drive', {
      gaugeType: steelseries.GaugeType.TYPE4,

      titleString: 'Drive',
      minValue: -127,
      maxValue: 127,
      size: 201,
      lcdVisible: true,
      lcdDecimals: 0,
      thresholdVisible: false,
      ledVisible: false
    });

    this.gauges.gaugeTurn = new steelseries.Radial('gauge_turn', {
      gaugeType: steelseries.GaugeType.TYPE4,

      titleString: 'Turn',
      minValue: -127,
      maxValue: 127,
      size: 201,
      lcdVisible: true,
      lcdDecimals: 0,
      thresholdVisible: false,
      ledVisible: false
    });

    this.gauges.RC_CHAN_1 = buildRCGauge('gauge_RC_CHAN_1', 'RC1');
    this.gauges.RC_CHAN_2 = buildRCGauge('gauge_RC_CHAN_2', 'RC2');
    this.gauges.RC_CHAN_3 = buildRCGauge('gauge_RC_CHAN_3', 'RC3');
    this.gauges.RC_CHAN_4 = buildRCGauge('gauge_RC_CHAN_4', 'RC4');
    this.gauges.RC_CHAN_5 = buildRCGauge('gauge_RC_CHAN_5', 'RC5');
    this.gauges.RC_CHAN_6 = buildRCGauge('gauge_RC_CHAN_6', 'RC6');
    this.gauges.RC_CHAN_7 = buildRCGauge('gauge_RC_CHAN_7', 'RC7');
    this.gauges.RC_CHAN_8 = buildRCGauge('gauge_RC_CHAN_8', 'RC8');

    return this;
  }
});

function buildRCGauge(id, title) {
  return new JustGage({
      id: id,
      value: 1500,
      min: 900,
      max: 2100,
      title: title,
      refreshAnimationTime: 50,
      startAnimationTime: 0
    });
}
