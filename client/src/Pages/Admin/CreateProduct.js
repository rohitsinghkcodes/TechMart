import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import AdminMenu from '../../Components/Layouts/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Products"}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Products Page</h3>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct