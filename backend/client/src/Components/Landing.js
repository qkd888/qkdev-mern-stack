import React from "react";
import crowd from "../Images/crowd6.jpg"; // importing the cowd image
import Drake from "../Images/Drake1.jpg"; // importing the Drake image
import Kevin from "../Images/khart.jpg"; // importing the Kevin Hart image
import Mayweather from "../Images/mayweather.jpg"; // importing Mayweather image
import DjBoring from "../Images/dj.jpg"; // importing the DjBoring image

export default function Landing() {
  return (
    <div className="landing">
      {/*Landing page component */}
      <div className="hero">
        {/*Main heading */}
        <h1 className="mainHeading"> o7 Arena</h1>
        {/*Sub heading 1 */}
        <h3 className="subHeading">Home to the world's most iconic events</h3>

        {/*Hero Image */}
        <img src={crowd} alt="o7 Arena" className="o7Arena" />
      </div>
      {/*Sub heading 2 */}
      <h1 className="subHeading2">Highlights</h1>
      {/*Highlights container */}
      <div className="highlightsContainer">
        {/*event highlight 1 */}
        <div className="highlight">
          <img src={Drake} alt="o7 Arena" width={200} height={200} />
          <p> 3 February 2022</p>
          <p>Drake</p>
          <p> Big Scropion Tour</p>
        </div>
        {/*event highlight 2 */}
        <div className="highlight">
          <img src={Kevin} alt="o7 Arena" width={200} height={200} />
          <p> 1 May 2022</p>
          <p>Kevin Hart</p>
          <p>Hand In The Cookie jar</p>
        </div>
        {/*event highlight 3 */}
        <div className="highlight">
          <img src={Mayweather} alt="o7 Arena" width={200} height={200} />
          <p> 15 May 2022</p>
          <p>MayWeather vs pacquiao</p>
          <p>One last fight</p>
        </div>
        {/*event highlight 4 */}
        <div className="highlight">
          <img src={DjBoring} alt="o7 Arena" width={200} height={200} />
          <p> 6 June 2022</p>
          <p>Dj Boring</p>
          <p>Lofi House To The World tour</p>
        </div>
      </div>
    </div>
  );
}
