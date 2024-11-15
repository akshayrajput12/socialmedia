import React, { useState, useRef, useCallback } from 'react';
import { Image, MessageCircle, Heart, Share2, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../lib/store';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    university: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const POSTS_PER_PAGE = 5;

export const NewsFeedPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState<Post[]>(generateSamplePosts(POSTS_PER_PAGE));
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(prev => [...prev, ...generateSamplePosts(POSTS_PER_PAGE)]);
    setIsLoading(false);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() && !selectedImage) return;

    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: user?.name || '',
        avatar: user?.avatar || '',
        university: user?.university || '',
      },
      content: newPost,
      image: selectedImage || undefined,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      isLiked: false,
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setSelectedImage(null);
  };

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <form onSubmit={handleSubmitPost}>
          <div className="flex space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 resize-none border-0 focus:ring-0 text-lg"
              rows={2}
            />
          </div>
          
          {selectedImage && (
            <div className="relative mt-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-96 rounded-lg object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Image className="w-5 h-5 mr-2" />
                Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <Button type="submit" disabled={!newPost.trim() && !selectedImage}>
              Post
            </Button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.author.university} •{' '}
                    {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <p className="mt-4 text-gray-900">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="mt-4 rounded-lg max-h-96 w-full object-cover"
                />
              )}

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-2 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-600'
                    } hover:text-red-500`}
                  >
                    <Heart
                      className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="px-4 py-3 border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMorePosts}
            isLoading={isLoading}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate sample posts
function generateSamplePosts(count: number): Post[] {
  const universities = [
    'Stanford University',
    'MIT',
    'Harvard University',
    'UC Berkeley',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random().toString(36).substr(2, 9),
    author: {
      name: `Student ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      university: universities[i % universities.length],
    },
    content: `This is a sample post ${i + 1} with some interesting content about university life and academic experiences. #studentlife #university`,
    image: i % 2 === 0 ? `https://source.unsplash.com/random/800x600?education&sig=${i}` : undefined,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    isLiked: false,
  }));
}