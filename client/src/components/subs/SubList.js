import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub'

const SubList = () => {
  const [subs, setSubs] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
    getSubs().then(res => {
      console.log(res)
      setSubs(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])
  const listSubs = () =>
    subs.map(sub => (
      <div className='col btn-block m-3 btn btn-outlined-primary btn-lg btn-raised'
        key={sub._id}>
        <Link to={`/sub/${sub.slug}`}>{sub.name}</Link>
      </div>

    ))


  return (
    <div className='container'>
      <div className='row text-center'>
        {loading ? <h4 className='text-danger'>Loading...</h4> : (

          subs && subs.length > 0 ? listSubs() :
            'No Sub category'


        )}

      </div>
    </div>
  )
}

export default SubList
