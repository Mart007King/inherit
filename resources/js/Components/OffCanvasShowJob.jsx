import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Offcanvas from "./OffCanvas";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import SpaciousDiv from "./SpaciousDiv";
import Loading from "./Loading";
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaClipboardList, FaUserTie } from 'react-icons/fa'; // Importing icons for better UI
import '../Pages/files';

export default function OffCanvasShowJob({ job }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Offcanvas
            id="jobShow"
            title={isLoading ? (
                <Loading />
            ) : (
                job ? (
                    <div className="job-title">
                        <p>Viewing Job - <b>{job.title}</b></p>
                    </div>
                ) : (
                    <p>An error Occurred</p>
                )
            )}
            content={
                !isLoading && job && (
                    <div className="job-details p-3">
                        <div className="mb-3">
                            <h4>Job Details</h4>
                            <p>{job.description}</p>
                        </div>
                        <div className="job-meta d-flex flex-wrap gap-3 mb-3">
                            <div className="job-location d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2" />
                                <span>{job.location}</span>
                            </div>
                            <div className="job-salary d-flex align-items-center">
                                <FaDollarSign className="me-2" />
                                <span>{job.salary_range}</span>
                            </div>
                            <div className="job-type d-flex align-items-center">
                                <FaClipboardList className="me-2" />
                                <span bg="badge info">{job.job_type}</span>
                            </div>
                            <div className="job-status d-flex align-items-center">
                                <FaClock className="me-2" />
                                <span>{job.employment_status}</span>
                            </div>
                        </div>
                        <div className="job-requirements mb-3">
                            <h5>Requirements</h5>
                            <p>{job.requirements}</p>
                        </div>
                        <div className="job-skills mb-3">
                            <h5>Skills</h5>
                            <p>{job.skills}</p>
                        </div>
                        <div className="job-details-list mb-3">
                            <h5>Additional Information</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <FaUserTie className="me-2" /> Experience: {job.years_of_experience} years
                                </li>
                                <li className="list-group-item">
                                    <FaClock className="me-2" /> Application Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                                </li>
                                <li className="list-group-item">
                                    <FaClipboardList className="me-2" /> Category: {job.category}
                                </li>
                                <li className="list-group-item">
                                    <FaClipboardList className="me-2" /> Status: {job.status}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        />
    );
}
