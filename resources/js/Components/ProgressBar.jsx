import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

let progressInterval = null;

const ProgressBar = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [canClick, setCanClick] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [showJobs, setShowJobs] = useState(false);
    const [jobSearchIndex, setJobSearchIndex] = useState(1);

    useEffect(() => {
        // Fetch the initial click count and last clicked time from the server
        const fetchClickData = async () => {
            const response = await axios.get('/api/click-count');
            const { count, canClick, lastClickedAt } = response.data;
            setClickCount(count);
            setCanClick(canClick);

            if (!canClick) {
                const now = moment();
                const lastClicked = moment(lastClickedAt);
                const diff = lastClicked.add(24, 'hours').diff(now);
                setCountdown(diff);
            }
        };
        fetchClickData();
    }, []);

    useEffect(() => {
        if (loading) {
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setLoading(false);
                        fetchJobs(); // Fetch jobs when progress completes
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50); // Adjust the speed as necessary
        }
    }, [loading]);

    useEffect(() => {
        if (clickCount >= 3) {
            setCanClick(false);
            setCountdown(24 * 60 * 60 * 1000); // 24 hours in milliseconds
        }
    }, [clickCount]);

    useEffect(() => {
        if (countdown !== null) {
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1000) {
                        clearInterval(interval);
                        setCanClick(true);
                        setClickCount(0);
                        return null;
                    }
                    return prev - 1000;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);

    const handleClick = async () => {
        if (clickCount < 3) {
            setLoading(true);
            setProgress(0); // Reset progress
            setClickCount(prev => prev + 1);
            await axios.post('/api/update-click-count', { count: clickCount + 1 });
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/fetch-jobs');
            setJobs(response.data.jobs);
            setShowJobs(true);
            setJobSearchIndex(clickCount); // Update the job search index
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const formatCountdown = (milliseconds) => {
        const duration = moment.duration(milliseconds);
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <center>
            {!loading && !showJobs ? (
                <>
                    <div className='progress w-50' style={{ height: 30 }}>
                        <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style={{ width: `${progress}%`, backgroundColor: 'purple' }}>
                            {progress}%
                        </div>
                    </div>
                    <div className='p-3'>
                        <button className='btn btn-sm mt-3 btn-success text-center' onClick={handleClick} disabled={loading || !canClick}>
                            {loading ? 'Bot is getting jobs...' : 'Start Inherit Bot'}
                        </button>
                        {!canClick && countdown !== null && (
                            <div className="mt-2 text-danger">
                                You can start the bot again in {formatCountdown(countdown)}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {showJobs ? (
                        <>
                            <h2>Search {jobSearchIndex} out of 3</h2>
                            <ul className='list-group'>
                                {jobs.map((job, index) => (
                                    <li key={index} className='list-group-item'>{job.title}</li>
                                ))}
                            </ul>
                            <a href="/bot-jobs" className="btn btn-primary mt-3">View Jobs for Bot</a>
                        </>
                    ) : (
                        <div>Loading video...</div>
                    )}
                </>
            )}
        </center>
    );
};

export default ProgressBar;
