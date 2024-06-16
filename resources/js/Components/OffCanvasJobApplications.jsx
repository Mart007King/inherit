import React, { useState } from "react";
import Offcanvas from "./OffCanvas";
import PrimaryButton from "./PrimaryButton";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import SpaciousDiv from "./SpaciousDiv";
import Loading from "./Loading";

export default function OffCanvasJobApplications({ application, error, thisJob }) {
    const [isLoading, setIsLoading] = useState(false);
    const [filteredApplications, setFilteredApplications] = useState([]);

    const UseBot = async (jobId) => {
        console.log('Filtering applications for job:', jobId);
        setIsLoading(true);
        try {
            const response = await axios.post('/filter', { thisJob: jobId });
            if (response.data) {
                setFilteredApplications(response.data);
                console.log('Filtered Applications:', response.data);
            } else {
                console.log('No filtered applications found');
                setFilteredApplications([]);
            }
        } catch (error) {
            console.error('Error filtering applications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const UseBotButton = ({ jobId }) => {
        const handleFilterApplications = () => {
            UseBot(jobId);
        }

        return (
            <PrimaryButton onClick={handleFilterApplications}>
                <FaRobot /> Filter Applications
            </PrimaryButton>
        );
    };

    return (
        <Offcanvas
            id='thisJobApplications'
            title={
                <SpaciousDiv className="d-flex justify-content-center">
                    <p className="h4">Applications</p>
                    <UseBotButton jobId={application ? (
                application[0] ? (
                    application[0].job_id
                ) : (
                    'Unknown'
                )
            ) : (
                'Unknown'
            )} />
                </SpaciousDiv>
            }
            content={
                isLoading ? (
                    <p><Loading /></p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map((application, index) => (
                                <ul key={index}>
                                    <hr className="mb-1 mt-1" />
                                    <li>{application.cover_letter}</li>
                                    <hr className="mb-1 mt-1" />
                                </ul>
                            ))
                        ) : Array.isArray(application) && application.length > 0 ? (
                            application.map((application, index) => (
                                <ul key={index}>
                                    <hr className="mb-1 mt-1" />
                                    <li>{application.resume_link}</li>
                                    <hr className="mb-1 mt-1" />
                                </ul>
                            ))
                        ) : (
                            <p>No Applications found</p>
                        )}
                    </>
                )
            }
        />
    );
}
