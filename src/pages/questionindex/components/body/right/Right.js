import { connect } from 'react-redux'
import CodeEditor from '../../code-editor'
import SolutionRight from '../solution/solution-right'

const Right = ({ showDetail }) => {
  return <div className='right' style={{
    height: "calc(100vh - 45px)",
    display: "flex",
    flexShrink: 0,
    flexDirection: "column"
  }}>
    <div id='div1' style={{ height: "100%" }}>
      {
        showDetail
          ? <SolutionRight />
          : <CodeEditor />
      }
    </div>
  </div>
}
export default connect(
  state => ({
    showDetail: state.solution.showDetail
  })
)(Right)