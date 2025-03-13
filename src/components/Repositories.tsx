'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useUser } from '@clerk/nextjs';

const Repositories = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        if (isLoaded && isSignedIn && user?.username) {
            const fetchRepositories = async () => {
                try {
                    const response = await fetch(
                        `https://api.github.com/users/${user.username}/repos`
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch repositories');
                    }
                    const data = await response.json();
                    const list = data.map((repo: any) => ({
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url,
                        stars: repo.stargazers_count,
                        forks: repo.forks,
                    }));
                    setRepos(list);
                } catch (error) {
                    console.error('Error fetching repositories:', error);
                }
            };
            fetchRepositories();
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) {
        return <div>Loading user data...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in to view your repositories.</div>;
    }

    return (
        <div className="mt-4 p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Repository Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Stars</TableHead>
                        <TableHead>Forks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {repos.map((repo: any) => (
                        <TableRow key={repo.name}>
                            <TableCell>
                                <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </TableCell>
                            <TableCell>{repo.description}</TableCell>
                            <TableCell>{repo.stars}</TableCell>
                            <TableCell>{repo.forks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Repositories;
