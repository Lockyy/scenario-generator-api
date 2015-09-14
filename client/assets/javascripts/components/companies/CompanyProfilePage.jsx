import React from 'react';
import _ from 'lodash';
import CompanyStore from '../../stores/CompanyStore'
import CompanyProfileHeader from './CompanyProfileHeader'
import FluxCompanyActions from '../../actions/FluxCompanyActions'

const CompanyProfilePage  = React.createClass({
  displayName: 'CompanyProfilePage',

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
      return this.defaultProps();
  },

  componentDidMount() {
    CompanyStore.listen(this.onChange.bind(this));
    let params = this.context.router.state.params;
    FluxCompanyActions.fetchData(params);
  },

  openSharePageModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeSharePageModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function render() {
    let company  = this.state;
    return (
    <div className='company profile show'>
      <div className='main-content'>
        <h1 className='title'>Company Profile</h1>
        <CompanyProfileHeader onShare={this.openSharePageModal} onCloseShareModal={this.closeSharePageModal} {...company}/>
      </div>
    </div>
    );
  },

  onChange(data) {
    this.setState(data.data);
  },

  defaultProps: function defaultProps() {
    return {
      products: [],
      tags: [],
      freeInput: false
    }
  }
});

export default CompanyProfilePage;
