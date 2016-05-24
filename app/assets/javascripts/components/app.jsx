var App = React.createClass({
  propTypes: {
    generators: React.PropTypes.array,
    scenario: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div>
        <div>Generators: {this.props.generators}</div>
        <div>Scenario: {this.props.scenario}</div>
        <div>Current User: {this.props.currentUser}</div>
      </div>
    );
  }
});
