'use client'
import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/500.css';
import { Wordcloud } from '@visx/wordcloud';
import { scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';

const WordCloud = ({ words, handleWordClick }) => {

    // remove undefined/null from words
    words = words.filter(word => word !== undefined && word !== null && word !== '')

    //  Configures the Word cloud 
    const wordCloudOptions = {
        rotations: 1,
        rotationAngles: [0, 0],
        fontFamily: 'Roboto',
        fontSizes: [20, 150],
        fontWeight: 500,
        padding: 5,
        spiral: 'archimedean',
        transitionDuration: 1000,
        deterministic: true,
        enableTooltip: false,
        enableOptimizations: true,
        randomSeed: 420,
    };

    const colors = ['#143059', '#2F6B9A', '#82a6c2'];

    // Converts an array of words into a word cloud data structure
    const generateWordCloudData = (words) => {
        const wordCloudMap = new Map();
        words.forEach((word) => { wordCloudMap.set(word, (wordCloudMap.get(word) || 0) + 1); });
        const wordCloudData = [...wordCloudMap].map(([text, value]) => ({ text, value })).sort((a, b) => b.value - a.value);
        return wordCloudData.slice(0, 200);
    };

    // Generates word cloud data
    const wordCloudData = words.length > 0 ? generateWordCloudData(words) : [];

    // Define font scale
    const fontScale = scaleLinear({
        domain: [Math.min(...wordCloudData.map(d => d.value)), Math.max(...wordCloudData.map(d => d.value))],
        range: [15, 50],
    });

    const fixedValueGenerator = () => 0.5;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth * 0.9);
    }, []);

    // Renders the word cloud
    return (
        <div className="word-cloud-container">
            <Wordcloud
                words={wordCloudData}
                width={width}
                height={300}
                font={wordCloudOptions.fontFamily}
                fontSize={d => fontScale(d.value)}
                padding={wordCloudOptions.padding}
                rotate={0}
                random={fixedValueGenerator}
            >
                {words => words.map((word, index) => (
                    <Text
                        key={index}
                        fontFamily={wordCloudOptions.fontFamily}
                        fontSize={fontScale(word.value)}
                        fontWeight={wordCloudOptions.fontWeight}
                        fill={colors[index % colors.length]}
                        textAnchor="middle"
                        transform={`translate(${word.x}, ${word.y})rotate(${word.rotate})`}
                        onClick={() => handleWordClick(word)}
                    >
                        {word.text}
                    </Text>
                ))}
            </Wordcloud>
        </div>
    );
};

export default WordCloud;