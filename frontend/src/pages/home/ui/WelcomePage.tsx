import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Button from "@/views/Button/ui/Button";

import "./WelcomePage.scss";

import mainDecor from "@/shared/assets/welcome-page/main-decoration.svg";
import firstDecor from "@/shared/assets/welcome-page/first_decoration.svg"
import secondDecor from "@/shared/assets/welcome-page/second-decoration.svg";
import thirdDecor from "@/shared/assets/welcome-page/third-decoration.svg";

import logo from "@/shared/assets/welcome-page/logo.svg";
import wave from "@/shared/assets/welcome-page/waveform/wave.svg";
import hoveredWave from "@/shared/assets/welcome-page/waveform/hovered_wave.svg";
import micro from "@/shared/assets/welcome-page/waveform/micro.svg";
import hoveredMicro from "@/shared/assets/welcome-page/waveform/hovered_micro.svg";
import rectangleBlock from "@/shared/assets/welcome-page/rectangle.png";

const WelcomePage = () => {
  const AboutService = useRef<HTMLDivElement>(null);
  const pricePlan = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);
  
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

    <div className="container" data-testid="welcome-page">
      <nav>
          <img src={logo} alt="logo" />
          <div className="nav-bar">
            <div 
              onClick={() => AboutService.current?.scrollIntoView({ behavior: 'smooth' })
            }>О сервисе</div>
            <div 
              onClick={() => pricePlan.current?.scrollIntoView({ behavior: 'smooth' })}
            >Тарифные планы</div>
            <NavLink to={"/auth"}>
              <Button children="Войти" onclick={() => {}}/>
            </NavLink>
          </div>
      </nav>

      <div className="main-title">
        <img src={mainDecor} className="main-decor" alt="decor" />

        <div className="title">
          <h1>Convert audio to text</h1>

          <p style={{marginBlock: "0 20px"}}>
            Загрузите или запишите голос и получите
            конспект любой сложности в течение минуты
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
            <h4>Прямо сейчас</h4>
            <p>
              Экономия времени Конспект формируется автоматически — больше не нужно записывать вручную
            </p>
          </div>
          <div className="block">
            <p>
              Точная и структурированная запись Искусственный интеллект распознаёт речь с высокой точностью и оформляет текст в виде понятного конспекта.
            </p>
            <NavLink to="/chat">
              <Button onclick={() => {}} children="Вперед!"/>
            </NavLink>
          </div>
      </div>

      <h2 ref={AboutService} >Как это работает?</h2>

      <div className="steps-block">
          <div className="blocks-row">
            <div className="block">
              <h4>Регистрация</h4>

              <p>
                Зарегистрируйтесь на сайте, создайте личный кабинет и выберите подходящий тариф. Доступен бесплатный пробный период, чтобы оценить возможности сервиса
              </p>

              <div className="rank-circle">1</div>
            </div>
            
            <div className="block">
              <h4>Выбор формата</h4>

              <p>
                Вы можете начать запись лекции в прямом эфире через сайт или загрузить заранее записанную аудиозапись
              </p>

              <div className="rank-circle">2</div>
            </div>

            <div className="block">
              <h4>Запуск обработки</h4>

              <p>
                Нажмите «Начать запись» для прямой трансляции или «Загрузить файл», если лекция уже записана.
              </p>

              <div className="rank-circle">3</div>
            </div>
          </div>

          <div className="blocks-row">
            <div className="block" style={{height: "250px"}}>
              <h4>Получение и просмотр</h4>

              <p>
                После завершения обработки конспект всегда можно найти в 
                одном из созданных вами ранее чатов. Конспекты хранятся 
                в течение 90 дней и вы всегда можете к ним обратиться
              </p>

              <div className="rank-circle">4</div>
            </div>
            
            <div className="final-step-wrapper">
              <img src={rectangleBlock} style={{width: "100%", height: "100%"}} alt="block" />
              <div className="content">
                <h4>Подписка</h4>

                <p>
                  В разделе настроек аккаунта пользователи могут управлять своей подпиской:
                  продлить её срок действия, изменить тарифный план или пополнить баланс.
                  Здесь же отображается информация о текущих лимитах использования сервиса
                  (например, количество доступных запросов, хранилище данных и т.д.),
                  а также список активных функций, доступных в рамках выбранного тарифа.
                  Это позволяет удобно контролировать свой аккаунт.
                </p>

                <NavLink to="/chat">
                  <Button onclick={() => {}} children="Попробовать бесплатно" isFilled={false} />
                </NavLink>
                <div className="rank-circle">5</div>
              </div>
            </div>
          </div>
      </div>

      <h2 ref={pricePlan}>Тарифные планы</h2>

      <div className="plans-container">
        <div className="price-plan">
          <div className="header">
            Пробная <span>Free</span>
          </div>
          <div className="line" />
          <div className="content">
            <div className="option">
              <div className="dot" />
              3 дня после входа
            </div>

            <div className="option">
              <div className="dot" />
              Хранение до 7 дней в лк.
            </div>

            <div className="option disabled">
              <div className="dot" />
              1 лекция в прямом эфире (15 минут)
            </div>

            <div className="option disabled">
              <div className="dot" />
              1 загрузка готового файла
            </div>

            <div className="option disabled">
              <div className="dot" />
              Только база
            </div>
          </div>

            <div className="button-container">
              <Button isDisabled onclick={() => {}} children="Текущий план"/>
            </div>
        </div>

        <div className="price-plan">
          <div className="header">
            <div className="text-red">V.I.P</div>
            <span>$$$/m</span>
          </div>

          <div className="line" />
          
          <div className="content">
            <div className="option">
              <div className="dot" />
              Срок на 1 месяц
            </div>

            <div className="option">
              <div className="dot" />
              Хранение до 30 дней в лк.
            </div>

            <div className="option">
              <div className="dot" />
              Безлимитные лекции в прямом эфире
            </div>

            <div className="option disabled">
              <div className="dot" />
              Загрузка файлов до 60 минут
            </div>

            <div className="option disabled">
              <div className="dot" />
              Наличие техподдержки
            </div>
          </div>

          <div className="button-container">
            <Button onclick={() => {}} children="Улучшить свой план"/>
          </div>
        </div>

        <div className="price-plan">
          <div className="header">
            <div className="text-red">Premium</div>
            <span>$$$/m</span>
          </div>

          <div className="line" />

          <div className="content">
            <div className="option">
              <div className="dot" />
              Срок на 1 месяц
            </div>

            <div className="option">
              <div className="dot" />
              Хранение до 90 дней в лк.
            </div>

            <div className="option">
              <div className="dot" />
              Включает всё из VIP
            </div>

            <div className="option">
              <div className="dot" />
              Повышенная точность распознавания
            </div>

            <div className="option">
              <div className="dot" />
              Быстрая техподдержка через чат
            </div>
          </div>

          <div className="button-container">
            <Button onclick={() => {}} children="Улучшить свой план" />
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