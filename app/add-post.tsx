import { useRouter } from 'expo-router';

import { useState } from 'react';
import CreatePostModal from './components/CreatePostModal';

type CategoryKey = 'horses' | 'tack' | 'services' | 'jobs';

export default function AddPost() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('horses');

    const marketplaceData: Record<CategoryKey, {
        name: string;
        subcategories: string[];
        listings: any[];
    }> = {
        horses: {
            name: 'Horses',
            subcategories: ['All', 'Sale', 'Lease', 'Part Board', 'Full Board'],
            listings: []
        },
        tack: {
            name: 'Tack',
            subcategories: ['All', 'Saddles', 'Bridles', 'Blankets', 'Boots', 'Other'],
            listings: []
        },
        services: {
            name: 'Services',
            subcategories: ['All', 'Training', 'Farrier', 'Vet', 'Transport', 'Boarding'],
            listings: []
        },
        jobs: {
            name: 'Jobs',
            subcategories: ['All', 'Barn Manager', 'Groom', 'Trainer', 'Rider', 'Intern'],
            listings: []
        }
    };

    return (
        <CreatePostModal
            onClose={() => router.push("/marketplace")}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            marketplaceData={marketplaceData}
        />
    );
}