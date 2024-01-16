import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'

const Orders = () => {
  return (
    <Layout title={"Dashboard - My Orders"}>
    <div className="container-fluid p-3">
    <div className="row">
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="col-md-9">
        <div className="card w-75 p-3">
          <h3>My Orders Page</h3>
        </div>
      </div>
    </div>
    </div>
</Layout>
  )
}

export default Orders