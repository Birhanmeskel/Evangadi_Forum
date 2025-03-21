import React, {useContext} from 'react'
import { AppState } from '../../App';

function Home() {
  const  {user} = useContext(AppState);
  return (
    <div>Home


      <br />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid odit quo animi ipsa, illo, architecto nemo magni accusamus repellat esse recusandae ex sint ea alias sit ipsam, iusto illum omnis?</p>
      <br />
      <br />

     Welcome: {user.username}
    </div>
  )
}

export default Home