import React, { Component } from "react";
import { Icon } from "antd";
import "./index.less";
class TableSortBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus: null
    };
  }
  /**
   * 点击事件
   */
  clickEvent = (onclick, dataIndex) => {
    const { btnstatus } = this.state;
    this.setState({
      btnstatus:
        btnstatus === null
          ? "descend"
          : btnstatus === "descend"
          ? "ascend"
          : null
    });
    setTimeout(() => {
      onclick(dataIndex, this.state.btnstatus);
    }, 0);
  };
  componentWillReceiveProps(nextprops){
    const {onlykey,dataIndex}=nextprops
  }
  render() {
    const {
      content,
      onClick,
      btnstyle,
      contentstyle,
      titlestyle,
      dataIndex,
      onlykey
    } = this.props;
    const { btnstatus } = this.state;
    return (
      <div
        className="tableTit"
        onClick={() => this.clickEvent(onClick, dataIndex, onlykey)}
        style={titlestyle && { ...titlestyle }}
      >
        <div className="content" style={contentstyle && { ...contentstyle }}>
          {content}
        </div>
        <div className="btn" style={btnstyle && { ...btnstyle }}>
          <Icon
            type="caret-up"
            className={btnstatus === "ascend" &&dataIndex===onlykey&& "checked"}
          />
          <Icon
            type="caret-down"
            className={btnstatus === "descend"&&dataIndex===onlykey && "checked"}
          />
        </div>
      </div>
    );
  }
}
export default TableSortBtn;
