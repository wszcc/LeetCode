import React from 'react'
import { Input } from "antd";

const Search = (props) =>{
    return  (<div id="search_wrap">
        <Input
            placeholder="搜索"
            style={{width:300}}
        />
    </div>
        
    )
}

export default Search;