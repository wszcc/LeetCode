import { FC } from 'react'

interface Props {
    difficulty: 'easy' | 'mid' | 'difficulty'
}

const DiffTag:FC<Props> = (props) => {
  const { difficulty } = props
  if(difficulty === 'easy') {
    return (
      <span className='easy'>简单</span>
    );
  }else if (difficulty === 'mid') {
    return (
      <span className= 'mid'>中等</span>
    )
  }else{
    return (
      <span className = 'difficult'>困难</span>
    )
  }
  
};

export default DiffTag;
