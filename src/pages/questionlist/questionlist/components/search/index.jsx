import React from 'react'
import { Input } from "antd";

const Search = (props) =>{
    return  (<div id="search_wrap">
        <Input
            placeholder="搜索题目 名称、内容 或 编号"
            style={{width:300}}
            style={{borderRadius:16}}
        />
    </div>
        
    )
}

export default Search;