import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main_style.css';
import {Button, Accordion, AccordionItem} from "@nextui-org/react";
import mainImage from '../assets/main.png';
import Frame from '../assets/Frame.svg';
import block3img from '../assets/block3.png'
import { Link, useNavigate } from 'react-router-dom';



const MainPage = () => {
    const navigate = useNavigate();

    const handleAllTerapists = () => {
        navigate('/all-therapists');
    };

    return (
        <div className="main-container">
            <Header/>
            <div className="content">
                <img
                    className="placeholder-image"
                    src={mainImage}
                    alt="Placeholder"
                />

                <div className="text-section">
                    <h1 className="main-title">
                        Знайдіть спеціаліста, який Вас підтримає
                    </h1>

                    <p className="main-description">
                        Ви не самотні. Ми тут, щоб надати необхідну підтримку та допомогу.
                    </p>

                    <div className="button-group">
                        <Button className="primary-button">
                            Підібрати фахівця
                        </Button>

                        <span className="separator">або</span>

                        <Button onPress={handleAllTerapists} className="secondary-button">
                            Усі фахівці
                        </Button>
                    </div>
                </div>
            </div>


            <div id="stats-block" className="stats-block">
                <div className="stat-item stat-item-1">
                    <span className="stat-value">50 000+</span>
                    <span className="stat-descriptiona">сесій проведено</span>
                </div>
                <div className="stat-item stat-item-2">
                    <span className="stat-value">97%</span>
                    <span className="stat-descriptiona">позитивних відгуків</span>
                </div>
                <div className="stat-item stat-item-3">
                    <span className="stat-value">3хв</span>
                    <span className="stat-descriptiona">час пошуку фахівця</span>
                </div>
                <div className="stat-item stat-item-4">
                    <span className="stat-value">200+</span>
                    <span className="stat-descriptiona">перевірених фахівців</span>
                </div>
            </div>


            <div className="text-green text-5xl font-semibold stat-title">
                Тільки 3% спеціалістів проходять відбір
            </div>
            <div className="block3">
                <div className="content-container">

                    <div className="stat-texts">
                        <div className="stat-subtitle-container">
                            <img className="stat-subtitle-icon" src={Frame}/>
                            <div className="text-green text-4xl font-semibold stat-subtitle">
                                Освіта та досвід
                            </div>
                        </div>

                        <div className="text-green text-lg font-semibold stat-description">
                            Всі спеціалісти мають вищу психологічну, медичну та військову освіту, а також додаткові
                            сертифікації у визнаних терапевтичних підходах.
                        </div>

                        <div className="stat-subtitle-container">
                            <img className="stat-subtitle-icon" src={Frame}/>
                            <div className="text-green text-4xl font-semibold stat-subtitle">
                                Підвищення кваліфікації
                            </div>
                        </div>

                        <div className="text-green text-base font-semibold stat-description">
                            Верифікуємо належність психотерапевтів до спільнот та асоціацій, а також володіння
                            додатковими напрямами.
                        </div>

                        <div className="stat-subtitle-container">
                            <img className="stat-subtitle-icon" src={Frame}/>
                            <div className="text-green text-4xl font-semibold stat-subtitle">
                                Співбесіда та випробувальний термін
                            </div>
                        </div>

                        <div className="text-green text-base font-semibold stat-description">
                            Особисто перевіряємо дотримання фахівцем етичних норм, особливості професійного підходу та
                            досвіду на практичних кейсах.
                        </div>
                    </div>

                    <img className="stat-right-image" src={block3img} alt="Картинка справа"/>
                </div>
            </div>

            <div className="text-green text-5xl font-semibold stat-title text-center mb-8">
                Питання та відповіді
            </div>
            <div className="accordion-container">
                <Accordion variant="splitted">
                    <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        title="Як сформулювати запит до психолога?"
                        css={{
                            border: 'none',
                            padding: 0,
                        }}
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            Самостійно ідентифікувати корінь проблеми може бути доволі складно.
                            Не треба переживати – психотерапевт доможе із визначенням запиту. У такому разі вам слід
                            описати симптоматику проблеми: що саме приносить дискомфорт, як це впливає на ваше
                            повсякдення,
                            як саме це пов'язано з наслідками війни.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="Accordion 2"
                        title="У чому різниця між психологом, психотерапевтом і психіатром?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            <strong>Психолог</strong>
                            — фахівець, який здобув вищу психологічну освіту. Зазвичай робота з психологом
                            короткострокова: потрібні кілька зустрічей, щоб розібратися з конкретною проблемою чи
                            ситуацією.
                            <br/>
                            <br/>
                            <strong>Психотерапевт</strong>
                            — спеціаліст із медичною освітою або з вищою/додатковою психологічною освітою. Перші можуть
                            виписувати медикаментозне лікування та доповнювати його деякими видами психотерапії. Другі
                            працюють із тим, що ми зазвичай маємо на увазі під психотерапією. Цих терапевтів на нашій
                            платформі – більшість. Вони використовують такі довгострокові методи, як психоаналіз, і
                            короткострокові – як, наприклад, когнітивно-поведінкова терапія.
                            <br/>
                            <br/>
                            <strong>Психіатр</strong>
                            — спеціаліст, який має вищу медичну освіту. Психіатр займається діагностикою, профілактикою
                            та лікуванням психічних хвороб, спираючись на фізіологію. У більшості випадків йдеться про
                            медикаментозне лікування.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="Accordion 3"
                        title="Як вибрати психолога онлайн?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            На нашій платформі є два способи вибрати фахівця:
                            <br/>
                            <br/>
                            1. відповісти на кілька запитань й отримати добірку спеціалістів, які найкраще вам
                            підходять;
                            <br/>
                            2. вибрати самостійно серед усіх спеціалістів платформи.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="4"
                        aria-label="Accordion 4"
                        title="Як відбувається перша сесія?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            Здебільшого це зустріч-знайомство. Для роботи фахівцю потрібно більше дізнатися про вас.
                            Він може розпитувати, що привело на сеанс, а також про різні життєві події, сім'ю, стосунки
                            тощо. Або ж слухатиме вашу розповідь, спрямовуючи уточнювальними запитаннями.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="5"
                        aria-label="Accordion 5"
                        title="Скільки сесій мені знадобиться та який результат я отримаю?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            Кількість сесій залежить від структури вашої особистості та потрібного рівня змін.
                            Психотерапевту вистачить 1-2 сесії для загального аналізу стану та історії. Надалі для
                            поверхневих змін (допомоги з адаптацією) достатньо від 5 до 20 сеансів,
                            на більш глибокі та цілісні трансформації (розбору травмуючих ситуацій) знадобиться більше
                            часу.
                            <br/>
                            <br/>
                            Результат психотерапії безпосередньо залежить від тих запитів, із якими на неї приходять.
                            Якщо вас непокоїть пост-траматичний синдром, то результатом буде вміння самостійно опанувати
                            панічні атаки та страх.
                            Якщо важливо згладити наслідки фобій для адаптації в цивільному житті, то психотерапія
                            допоможе впоратися
                            та навчитися жити зі старим досвідом у новому житті.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="6"
                        aria-label="Accordion 6"
                        title="Скільки коштує консультація психотерапевта?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            На нашій платформі представлені фахівці, вартість 50-хвилинної сесії яких коливається
                            приблизно від 600 грн і до 2600 грн. Ціну за сеанс кожен психолог виставляє самостійно,
                            вона залежить від кваліфікації та досвіду.
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="7"
                        aria-label="Accordion 7"
                        title="Усе сказане мною на сесії - конфіденційно?"
                        className="custom-accordion-item"
                    >
                        <div className="custom-accordion-content">
                            Зв’язок між вами та фахівцем відбувається напряму, без будь-якої участі з нашого боку.
                            Все, що відбувається на сесії, – конфіденційно.
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="text-green text-5xl font-semibold stat-title text-center mb-8">
                Коли необхідно звернутись по допомогу спеціаліста?
            </div>

            <div className="text-container">
                <span className="content-text">
                    <br/>
        Після повномасштабного вторгнення в Україну багато військових та ветеранів стикаються з емоційними
        і психологічними труднощами, які є природною реакцією на екстремальні обставини війни. Практика
        показує, що часто люди починають помічати зміни у своєму стані: смуток, стрес і тривога стають
        постійними супутниками, а відчуття радості або задоволення від звичних речей поступово зникає. У
        таких ситуаціях важливо звернути увагу на наступні ознаки:
        <br/>
        <br/>
    </span>
                <span className="list-text">
    <ul>
        <li>Контроль над емоціями стає складним завданням.</li>
        <li>Знижується ефективність виконання завдань, як бойових, так і в повсякденному житті.</li>
        <li>Зникає інтерес до активностей, які раніше приносили задоволення.</li>
        <li>З’являються проблеми зі сном: безсоння, кошмари або постійне відчуття втоми.</li>
        <li>Виникають зміни у харчовій поведінці: втрата апетиту або його надмірність.</li>
        <li>Важко будувати та підтримувати стосунки з побратимами, сім’єю чи друзями.</li>
        <li>Відзначаються погіршення фізичного здоров’я через психосоматичні реакції.</li>
        <li>Шукаєте тимчасове полегшення в алкоголі чи інших речовинах.</li>
        <li>Є усвідомлення потреби змін, але бракує розуміння, з чого почати.</li>
    </ul>
</span>

                <span className="final-text">
        <br/>Особливо важливо звернутися до психолога, якщо військовий пережив травматичні події: участь у
        бойових діях, втрату побратимів, фізичні або емоційні травми, полон чи наслідки поранення.
        Такі події можуть залишити глибокий слід на психоемоційному стані.
        <br/>Якщо ви помічаєте негативні зміни, причини яких важко зрозуміти або подолати самостійно,
        не варто зволікати — зверніться до психолога чи психотерапевта. Навіть якщо здається, що з вами
        все гаразд, консультація може допомогти краще зрозуміти власний стан і забезпечити необхідну підтримку.
        Ваше психологічне здоров’я так само важливе, як і фізична готовність, для продовження боротьби та
        відновлення після війни.
    </span>
            </div>


            <div className="Group15">
                <div className="text-green text-5xl font-semibold stat-title text-center mb-8">
                    Екстрені служби
                </div>
                <div className="Group16">
                    <div className="Rectangle6">
                        <p className="text-description">
                            <strong>Цілодобова гаряча лінія психологічної підтримки для ветеранів</strong><br/><br/>
                            Спеціалізована телефонна служба, де кваліфіковані психологи доступні 24/7 для надання
                            консультацій, підтримки в кризових ситуаціях, а також направлення до відповідних
                            спеціалістів для довгострокової роботи.
                        </p>
                        <div className="Rectangle5">
                            <div className="phone-numbers">(067) 594 94 46<br/>(095) 913 69 41</div>
                        </div>
                    </div>

                    <div className="Rectangle7">
                        <p className="text-description">
                            <strong>Мобільні групи кризової психологічної допомоги</strong><br/><br/>
                            Команди фахівців, які виїжджають до ветеранів за запитом, щоб оперативно надати підтримку у
                            випадках важких емоційних станів, суїцидальних думок або інших критичних ситуацій, де
                            потрібна негайна допомога.
                        </p>
                        <div className="Rectangle5">
                            <div className="phone-numbers">(067) 594 94 46<br/>(095) 913 69 41</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
