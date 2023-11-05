import {ImageResponse} from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    const {searchParams} = new URL(request.url);
    const name = searchParams.get('name');
    const data = JSON.parse(searchParams.get('data'))

    const barWidth = 5; // ширина одного чорного смуги (у пікселях)
    const barHeight = 70; // висота штрихкоду (у пікселях)
    const barColor = 'green'; // колір чорних смуг

    // Функція для генерації штрихкоду
    const generateBarcode = (value) => {
        const bars = [];
        const digits = value.toString();

        // Генерація чорних і білих смуг в залежності від значення
        for (let i = 0; i < digits.length; i++) {
            const digit = parseInt(digits[i]);

            for (let j = 0; j < digit; j++) {
                bars.push(
                    <div
                        key={`${i}-${j}`}
                        style={{
                            width: `${barWidth}px`,
                            height: `${barHeight}px`,
                            background: barColor,
                        }}
                    ></div>
                );
            }

            bars.push(<div key={`${i}-gap`} style={{width: `${barWidth}px`}}></div>);
        }

        return bars;
    };
    /*
    let buf = [
        {
            name: "Семінари Історія",
            count: 4,
            price: 200
        },
        {
            name: "МКР Історія",
            count: 2,
            price: 150
        },
        {
            name: "МКР Екологія",
            count: 2,
            price: 150
        },
        {
            name: "МКР ТРПО",
            count: 2,
            price: 150
        },
        {
            name: "Лаби ТРПО",
            count: 2,
            price: 100
        },
        {
            name: "МКР ОДМШІ",
            count: 2,
            price: 150
        },
        {
            name: "Лаби ОДМШІ",
            count: 2,
            price: 100
        },
        {
            name: "Лаби Екологія",
            count: 2,
            price: 100
        },
        {
            name: "Лаби РС",
            count: 4,
            price: 100
        },
        {
            name: "Курсач",
            count: 1,
            price: 1000
        },
        {
            name: "Диплом",
            count: 1,
            price: 9000
        }
    ]*/

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 40,
                    color: 'black',
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: "monospace"
                }}
            >
                <h1 style={{
                    textDecoration: 'underline'
                }}>{name}</h1>
                <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 40,
                    color: 'black',
                    background: 'white',
                }}>
                    {data.map(e => {
                        return <li>{`• ${e.name} - ${e.count}x = ${e.price * e.count}`}</li>
                    })
                    }
                </ul>
                <h2>Total: <i style={{ color: 'green' }}>
                    {data.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.price * currentValue.count;
                    }, 0)}
                </i> грн</h2>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    {generateBarcode("" + (Math.floor(Date.now() / 1000)))}
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {"" + (Math.floor(Date.now() / 1000))}
                </div>
            </div>
        ),
        {
            width: 700,
            height: 1200,
        },
    );
}
