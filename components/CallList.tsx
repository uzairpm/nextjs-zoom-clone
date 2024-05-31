// @ts-nocheck

'use client';

import React, { useState } from 'react'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import MeetingCard from './MeetingCard';

const CallList = ({type}: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No previous calls';
            case 'recordings':
                return 'No recordings';
            case 'upcoming':
                return 'No upcoming calls';
            default:
                return '';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call).id}
                    icon={
                        type === 'ended' ? '/icons/previous.svg' :
                        type === 'upcoming' ? '/icons/upcoming/svg' :
                        '/icons/recordings.svg'
                    }
                    title={(meeting as Call).state.custom.description.substring(0, 26) || 'No description'}
                    date={meeting.state.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                    isPreviousMeeting=''
                    buttonIcon1=''
                    handleClick=''
                    link=''
                    buttonText=''
                />
            )): (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList