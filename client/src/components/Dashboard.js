import React from 'react'
import {Link} from 'react-router-dom'

const Dashboard = ()=>{
        return (
            <div className='container'>
                Dashboard
                <div className="fixed-action-btn">
                <Link className="btn-floating btn-large teal" to="/surveys/new">
                    <i className="material-icons large">add</i>
                </Link>
                {/* <ul>
                    <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                    <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                    <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                    <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                </ul> */}
                </div>
            </div>
        )
    }
export default Dashboard