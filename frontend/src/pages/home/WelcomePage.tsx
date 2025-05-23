import "./ui/WelcomePage.scss";

import logo from "@/shared/assets/welcome-page/logo.svg";
import wave from "@/shared/assets/welcome-page/waveform/wave.svg";
import hoveredWave from "@/shared/assets/welcome-page/waveform/hovered_wave.svg";
import micro from "@/shared/assets/welcome-page/waveform/micro.svg";
import hoveredMicro from "@/shared/assets/welcome-page/waveform/hovered_micro.svg";
import rectangleBlock from "@/shared/assets/welcome-page/rectangle.png";

import mainDecor from "@/shared/assets/welcome-page/main-decoration.svg";
import firstDecor from "@/shared/assets/welcome-page/first_decoration.svg"
import secondDecor from "@/shared/assets/welcome-page/second-decoration.svg";
import thirdDecor from "@/shared/assets/welcome-page/third-decoration.svg";
import Button from "@/views/Button/ui/Button";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
  <>
    <img 
    src={firstDecor} 
    className="absolute-decor" 
    style={{top: "160px", right: "calc(20vw - 260px)"}} 
    alt="decor" />

    <img 
    src={secondDecor} 
    className="absolute-decor" 
    style={{top: "600px", left: "calc(20vw - 282px)"}}
    alt="decor" />

    <img 
    src={thirdDecor} 
    className="absolute-decor" 
    style={{bottom: "-850px", right: "calc(20vw - 290px)"}}
    alt="decor" />

    <div className="container">
      <nav>
          <img src={logo} alt="logo" />
          <div className="nav-bar">
            <div>About me</div>
            <div>Pricing plans</div>
            <NavLink to={"/auth"}>
              <Button children="Sign in" onclick={() => {}}/>
            </NavLink>
          </div>
      </nav>

      <div className="main-title">
        <img src={mainDecor} className="main-decor" alt="decor" />

        <div className="title">
          <h1>Convert audio to text</h1>

          <p style={{marginBlock: "0 20px"}}>
            Upload or record your text message and recieve
            customisable conspect message in a minute
          </p>

          <NavLink to="/chat">
            <div className="waveform">
              <div className="wave">
                <img src={wave} className="bg-wave" alt="pic" />
                <img src={hoveredWave} className="hovered-wave" alt="pic" />
              </div>

              <div className="micro">
                <img src={micro} alt="pic" />
                <img src={hoveredMicro} className="hovered-micro" alt="pic" />
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      <div className="target-blocks">
          <div className="block">
            <h4>Start now</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="block">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button onclick={() => {}} children="Start now"/>
          </div>
      </div>

      <h2>How it works?</h2>

      <div className="steps-block">
          <div className="blocks-row">
            <div className="block">
              <h4>First Step</h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor.
              </p>

              <div className="rank-circle">1</div>
            </div>
            
            <div className="block">
              <h4>Second Step</h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor.
              </p>

              <div className="rank-circle">2</div>
            </div>

            <div className="block">
              <h4>Third Step</h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor.
              </p>

              <div className="rank-circle">3</div>
            </div>
          </div>

          <div className="blocks-row">
            <div className="block" style={{height: "250px"}}>
              <h4>Fourth Step</h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              </p>

              <div className="rank-circle">4</div>
            </div>
            
            <div className="final-step-wrapper">
              <img src={rectangleBlock} style={{width: "100%", height: "100%"}} alt="block" />
              <div className="content">
                <h4>Fifth Step</h4>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident.
                </p>

                <Button onclick={() => {}} children="Try it for free" isFilled={false} />

                <div className="rank-circle">5</div>
              </div>
            </div>
          </div>
      </div>

      <h2>Pricing plans</h2>

      <div className="plans-container">
        <div className="price-plan">
          <div className="header">
            Primary <span>Free</span>
          </div>
          <div className="line" />
          <div className="content">
            <div className="option">
              <div className="dot" />
              First option
            </div>

            <div className="option">
              <div className="dot" />
              Second option
            </div>

            <div className="option disabled">
              <div className="dot" />
              Third option
            </div>

            <div className="option disabled">
              <div className="dot" />
              Fourth option
            </div>

            <div className="option disabled">
              <div className="dot" />
              Fifth option
            </div>
          </div>

            <div className="button-container">
              <Button isDisabled onclick={() => {}} children="Current plan"/>
            </div>
        </div>

        <div className="price-plan">
          <div className="header">
            <div className="text-red">V.I.P</div>
            <span>29$/m</span>
          </div>

          <div className="line" />
          
          <div className="content">
            <div className="option">
              <div className="dot" />
              First option
            </div>

            <div className="option">
              <div className="dot" />
              Second option
            </div>

            <div className="option">
              <div className="dot" />
              Third option
            </div>

            <div className="option disabled">
              <div className="dot" />
              Fourth option
            </div>

            <div className="option disabled">
              <div className="dot" />
              Fifth option
            </div>
          </div>

          <div className="button-container">
            <Button onclick={() => {}} children="Upgrade your plan"/>
          </div>
        </div>

        <div className="price-plan">
          <div className="header">
            <div className="text-red">Premium</div>
            <span>49$/m</span>
          </div>

          <div className="line" />

          <div className="content">
            <div className="option">
              <div className="dot" />
              First option
            </div>

            <div className="option">
              <div className="dot" />
              Second option
            </div>

            <div className="option">
              <div className="dot" />
              Third option
            </div>

            <div className="option">
              <div className="dot" />
              Fourth option
            </div>

            <div className="option">
              <div className="dot" />
              Fifth option
            </div>
          </div>

          <div className="button-container">
            <Button onclick={() => {}} children="Upgrade your plan" />
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="line" />

        <div className="content">
          <img src={logo} alt="logo" />
          <div className="info">
            © ИП Десятков Арсений Александрович (ИНН 507461020277)
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default WelcomePage;