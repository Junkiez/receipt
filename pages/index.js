import Image from 'next/image'
import {Inter} from 'next/font/google'
import {useEffect, useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [name, setName] = useState("");
    const [data, setData] = useState([])
    const [text, setText] = useState("")

    const onInput = (event) => {
        setText(event.target.value)
        let buf = []

        setData(event.target.value.split('\n').map(e => {
            return {
                name: e.split(';')[0],
                count: e.split(';')[1] ? e.split(';')[1] : 0,
                price: e.split(';')[2] ? e.split(';')[2] : 0
            }
        }))
    }

    const handleDownload = () => {
        const imageUrl = `/api?name=${name}&data=${JSON.stringify(data)}`
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'receipt.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-screen justify-center  bg-green-100">
            <div className="w-1/2 p-4 flex justify-center items-center">
                <div className="w-3/4 p-4 overflow-auto">
                    <input
                        type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md"
                        rows={8}
                        placeholder="name;count;price" value={text} onChange={onInput}
                    ></textarea>
                </div>
            </div>
            <div className="w-1/2 p-4 flex justify-center items-center">
                <div className="w-1/2">
                    <Image
                        alt="Image"
                        src={`/api?name=${name}&data=${JSON.stringify(data)}`}
                        className="w-full h-auto rounded-md"
                        height={100}
                        width={300}
                    />
                    <div className="flex justify-center p-2.5">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={handleDownload}
                        >
                            Download Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
