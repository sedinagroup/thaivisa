import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Globe,
  Plane
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Thailand Visa Requirements 2024: Complete Guide',
      excerpt: 'Everything you need to know about Thailand visa requirements, from tourist visas to business permits.',
      content: 'Full article content...',
      author: 'Visa Expert Team',
      publishedAt: new Date('2024-01-15'),
      readTime: 8,
      category: 'visa-guide',
      tags: ['visa', 'requirements', 'thailand', '2024'],
      featured: true,
      image: '/images/blog/visa-guide.jpg',
    },
    {
      id: '2',
      title: 'AI-Powered Visa Processing: The Future is Here',
      excerpt: 'Discover how artificial intelligence is revolutionizing visa applications and making the process faster and more accurate.',
      content: 'Full article content...',
      author: 'Tech Team',
      publishedAt: new Date('2024-01-10'),
      readTime: 6,
      category: 'technology',
      tags: ['ai', 'technology', 'automation'],
      featured: true,
      image: '/images/blog/ai-processing.jpg',
    },
    {
      id: '3',
      title: 'Top 10 Mistakes to Avoid in Your Visa Application',
      excerpt: 'Learn from common mistakes that lead to visa rejections and how to avoid them.',
      content: 'Full article content...',
      author: 'Application Specialist',
      publishedAt: new Date('2024-01-05'),
      readTime: 5,
      category: 'tips',
      tags: ['mistakes', 'tips', 'application'],
      featured: false,
      image: '/images/blog/mistakes.jpg',
    },
    {
      id: '4',
      title: 'Digital Nomad Visa: Working Remotely in Thailand',
      excerpt: 'Complete guide to Thailand\'s digital nomad visa program and how to apply.',
      content: 'Full article content...',
      author: 'Digital Nomad Expert',
      publishedAt: new Date('2023-12-28'),
      readTime: 10,
      category: 'visa-types',
      tags: ['digital-nomad', 'remote-work', 'thailand'],
      featured: false,
      image: '/images/blog/digital-nomad.jpg',
    },
    {
      id: '5',
      title: 'Thailand Tourism Recovery: Latest Updates',
      excerpt: 'Latest news on Thailand\'s tourism industry recovery and new policies for international visitors.',
      content: 'Full article content...',
      author: 'Tourism Analyst',
      publishedAt: new Date('2023-12-20'),
      readTime: 7,
      category: 'news',
      tags: ['tourism', 'recovery', 'updates'],
      featured: false,
      image: '/images/blog/tourism-recovery.jpg',
    },
    {
      id: '6',
      title: 'Document Checklist: What You Need for Your Thailand Visa',
      excerpt: 'Comprehensive checklist of all documents required for different types of Thailand visas.',
      content: 'Full article content...',
      author: 'Documentation Team',
      publishedAt: new Date('2023-12-15'),
      readTime: 4,
      category: 'documentation',
      tags: ['documents', 'checklist', 'requirements'],
      featured: false,
      image: '/images/blog/documents.jpg',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'visa-guide', name: 'Visa Guides', icon: Globe },
    { id: 'technology', name: 'Technology', icon: TrendingUp },
    { id: 'tips', name: 'Tips & Tricks', icon: User },
    { id: 'visa-types', name: 'Visa Types', icon: Plane },
    { id: 'news', name: 'News', icon: Calendar },
    { id: 'documentation', name: 'Documentation', icon: BookOpen },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thaivisa.ai Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest visa news, guides, and tips for your Thailand travel
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-1"
              >
                <category.icon className="h-3 w-3" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.publishedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === post.category)?.name}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.publishedAt.toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest visa news, guides, and tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;