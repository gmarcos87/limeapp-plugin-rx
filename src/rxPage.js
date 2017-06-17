import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { Link } from 'preact-router/match';

import { getNodeStatus, stopTimer, changeNode } from './rxActions';
import { getNodeData, isLoading } from './rxSelectors';

import { Box } from './components/box.js';

export class Page extends Component {
  
  componentDidMount() {
    this.props.getNodeStatus();
  }

  componentWillUnmount() {
    this.props.stopTimer();
  }

  loading(option, nodeData){
    if (!option) {
      return this.nodeStatus(nodeData);
    }
    return (
      <h4 style={{textAlign:'center'}} >
        {I18n.t('Loading node status...')}
      </h4>
    );
  }

  nodeStatus(node){
    if (node.hostname) {
      return (
        <div>

          <Box title={I18n.t('Most Active')}>
                <span style={{float:'right',fontSize:'2.7em'}}>{node.most_active.signal}</span>
                <span style={{fontSize:'1.4em'}} onClick={()=>this.props.changeNode(node.most_active.hostname.split('_')[0])}><b>{node.most_active.hostname.split('_')[0]}</b></span><br/>
                <b>{I18n.t('Interface')} </b>{node.most_active.iface.split('-')[0]}<br/>
                <b>{I18n.t('Traffic')} </b> {Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes)/1024/1024)}MB
               <div style={{clear:'both'}}></div>
           </Box>

            <Box title={I18n.t('Internet connection')}>
              <span>
                <b> {(node.internet.IPv4.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} IPv4 </b>
                <b> {(node.internet.IPv6.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} IPv6 </b>
                <b> {(node.internet.DNS.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} DNS </b>
              </span>
            </Box>
            
            <Box title={I18n.t('IP Addresses')}>
              { node.ips.map((ip,key) => (
                <span style={(key === 0)? {fontSize:'1.4em'} :{}}>
                  <b>IPv{ip.version} </b> {ip.address}< br/>
                </span>)
              )}
            </Box>

        </div>
      );
    }
  }

  render() {
    return (
      <div class="container" style={{paddingTop:'80px'}}>
        { this.loading(this.props.isLoading, this.props.nodeData,this.props.signal) }
      </div>
    );
  }
}


export const mapStateToProps = (state) => {
  return {
    nodeData: getNodeData(state),
    isLoading: isLoading(state)
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getNodeStatus: bindActionCreators(getNodeStatus,dispatch),
    stopTimer: bindActionCreators(stopTimer,dispatch),
    changeNode: bindActionCreators(changeNode,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);