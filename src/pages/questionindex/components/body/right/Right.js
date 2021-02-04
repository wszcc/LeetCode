import CodeEditor from '../../code-editor'

const Right = (props) => {
  const width = props

  return <div className='right' style={{
    height: "calc(100vh - 45px)",
    display: "flex",
    flexShrink:0 ,
    flexDirection: "column"
  }}>
    <div id='div1' style={{ height: "100%" }}>
      <CodeEditor />
    </div>
  </div>
}

export default Right