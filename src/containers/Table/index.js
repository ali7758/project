import React, { Component } from "react";
import { Select, Form, Popconfirm } from "antd";
import MEditTable, { EditableContext } from "../../components/MEditTable";
import TableSortBtn from "../../components/TableSortBtn";
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no. ${i}`,
    editing: false
  });
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      Sortkey:null
    };
  }
  changeEditing = (key, target, dataSource) => {
    if (!dataSource) {
      dataSource = this.state.dataSource;
    }
    let data = [...dataSource];
    data = data.map(item => {
      if (key === item.key) {
        return {
          ...item,
          editing: target
        };
      } else {
        return item;
      }
    });
    this.setState({ dataSource: data });
  };

  save = (form, key) => {
    let { dataSource } = this.state;
    form.validateFields((err, value) => {
      if (err) return;
      dataSource = dataSource.map(item => {
        if (item.key === key) {
          item = {
            ...item,
            ...value
          };
        }
        return item;
      });
      this.setState({ dataSource });
      this.changeEditing(key, false, dataSource);
    });
  };
  cancel = key => {
    console.log("cancel", key);
    this.changeEditing(key, false);
  };
  edit = key => {
    console.log("edit", key);
    this.changeEditing(key, true);
  };
  sort = () => {};
  render() {
    const { dataSource,Sortkey } = this.state;
    const columns = [
      {
        title: (
          <TableSortBtn
            content={"name"}
            dataIndex={"name"}
            onlykey={Sortkey}
            onClick={(a,b) => {
              console.log(a,b);
              this.setState({Sortkey:a})
            }}
          />
        ),
        dataIndex: "name",
        width: 200,
        editable: true,
        withToolTip: true
      },
      {
        title: (
          <TableSortBtn
            content={"age"}
            dataIndex={"age"}
            onlykey={Sortkey}
            btnstyle={{ paddingLeft: "10px" ,height:20}}
            onClick={(a,b) => {
              console.log(a,b);
              this.setState({Sortkey:a})
            }}
          />
        ),
        dataIndex: "age",
        width: 100,
        editable: true,
        withToolTip: true,
        render: (text, record, index) => <div>{text - 1}</div>
      },
      {
        title: "address",
        dataIndex: "address",
        width: 500,
        editable: true,
        withToolTip: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: 80,
        render: (text, record) => (
          <div>
            {record.editing ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{
                        marginRight: 8
                      }}
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <a onClick={() => this.edit(record.key)}>Edit</a>
            )}
          </div>
        )
      }
    ];

    return <MEditTable columns={columns} dataSource={dataSource} />;
  }
}
