### @jsx React.DOM ###

React = require('react')


ColorPicker = React.createClass
  render: ->
    React.DOM.div(null, "hi")


React.renderComponent(
  ColorPicker({}),
  document.getElementById('react-colorpicker')
)
