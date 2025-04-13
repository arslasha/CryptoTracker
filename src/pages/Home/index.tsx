import React from "react";
import styles from "./Home.module.css";
import { cryptoInfo, greetingText, popularCryptos } from "./data";

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <section className={styles.greeting}>
                <h1>{greetingText.title}</h1>
                <p>{greetingText.description}</p>
            </section>

            <section className={styles.info}>
                <h2>{cryptoInfo.title}</h2>
                <p>{cryptoInfo.description}</p>
            </section>

            <section className={styles.popularCryptos}>
                <h2>{popularCryptos.title}</h2>
                <ul>
                    {popularCryptos.list.map((crypto, index) => (
                        <li key={index}>
                            <strong>{crypto.name}</strong> - {crypto.description}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
