import { Avatar } from '@radix-ui/react-avatar';
import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Card, CardContent } from '../../components/ui/cards';
import useGlobalStorage from '../../store';

interface Participant {
    rank: number;
    name: string;
    avatar: string;
    score: number;
    eventCount: number;
}

const initialParticipants: Participant[] = [
    {
        rank: 1,
        name: '0x121...131',
        avatar: '/placeholder.svg',
        score: 2800,
        eventCount: 15,
    },
    {
        rank: 2,
        name: '0x442...222',
        avatar: '/placeholder.svg',
        score: 2650,
        eventCount: 12,
    },
    {
        rank: 3,
        name: '0x544...944',
        avatar: '/placeholder.svg',
        score: 2400,
        eventCount: 10,
    },
    {
        rank: 4,
        name: '0x412...889',
        avatar: '/placeholder.svg',
        score: 2200,
        eventCount: 8,
    },
    {
        rank: 5,
        name: '0x803...343',
        avatar: '/placeholder.svg',
        score: 2000,
        eventCount: 7,
    },
];

export default function Leaderboard() {
    const [participants, setParticipants] =
        useState<Participant[]>(initialParticipants);
    const [totalParticipants, setTotalParticipants] = useState(101);
    const { address } = useGlobalStorage();
    useEffect(() => {
        if (address) {
            addNewUser();
        }
    }, [address]);

    const addNewUser = () => {
        const newUser: Participant = {
            rank: 1,
            name: address.slice(0, 3) + '...' + address.slice(-3),
            avatar: '/placeholder.svg',
            score: 3000,
            eventCount: 1,
        };

        const updatedParticipants = [newUser, ...participants.slice(0, 4)].map(
            (p, index) => ({
                ...p,
                rank: index + 1,
            })
        );

        setParticipants(updatedParticipants);
        setTotalParticipants((prev) => prev + 1);
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Trophy className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Trophy className="w-6 h-6 text-orange-400" />;
            default:
                return (
                    <span className="text-zinc-400 font-medium">{rank}</span>
                );
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-zinc-800">
                    <CardContent className="p-4">
                        <div className="text-sm text-zinc-400">
                            Total Participants
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {totalParticipants}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-zinc-800">
                    <CardContent className="p-4">
                        <div className="text-sm text-zinc-400">
                            Total Events
                        </div>
                        <div className="text-2xl font-bold text-white">2</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                {participants.map((participant) => (
                    <Card
                        key={participant.rank}
                        className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-8">
                                    {getRankIcon(participant.rank)}
                                </div>
                                <Avatar className="h-12 w-12 border-2 border-zinc-800">
                                    <AvatarImage
                                        src={participant.avatar}
                                        alt={participant.name}
                                    />
                                    <AvatarFallback>
                                        {participant.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-white">
                                            {participant.name}
                                        </h3>
                                    </div>
                                    <div className="text-sm text-zinc-400">
                                        {participant.eventCount} events attended
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-white">
                                        {participant.score}
                                    </div>
                                    <div className="text-xs text-zinc-400">
                                        points
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}