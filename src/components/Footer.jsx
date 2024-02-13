import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="container-fluid py-5 text-white">
                <div className="d-flex flex-wrap align-items-start justify-content-center gap-5">
                    <div className='foot-col'>
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo" width={100}/>
                    <button className='btn btn-light'> JOIN THE COMMUNITY</button>
                    </div>
                    <div className='foot-col'>
                        <b>THE BASICS</b>
                        <a href="https://www.themoviedb.org/about">About Tmdb</a>
                        <a href="https://www.themoviedb.org/about/staying-in-touch">Contact Us</a>
                        <a href="https://www.themoviedb.org/talk">Support Forums</a>
                        <a href="https://developer.themoviedb.org/docs" target='_blank'>Api</a>
                        <a href="https://status.themoviedb.org/">System Status</a>
                    </div>
                    <div className='foot-col'>
                        <b>GET INVOLVED</b>
                        <a href="#">Contribution Bible</a>
                        <a href="#">Add New Movie</a>
                        <a href="#">Add New TV Show</a>
                        
                    </div>
                    <div className='foot-col'>
                        <b>COMMUNITY</b>
                        <a href="#">Guidelines</a>
                        <a href="#">Discussions</a>
                        <a href="#">Leaderboard</a>
                       
                    </div>
                    <div className='foot-col'>
                        <b>LEGAL</b>
                        <a href="#">Terms of Use</a>
                        <a href="#">API Terms of Use</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">DMCA Policy</a>
                       
                    </div>
                </div>
        </div>
    </footer>
  )
}

export default Footer