import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need for spiritual growth
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            IPray Daily combines the timeless wisdom of scripture with modern technology to create
            the most comprehensive prayer and Bible study experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Daily Prayer Confessions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative">
            <div className="absolute -top-3 left-6">
              <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <img src="/prayer.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Prayer Confessions</h3>
            <p className="text-gray-600">
              Discover prayers for every situation and season of life, with complete Bible study
              tools to deepen your understanding.
            </p>
          </div>

          {/* Prayer Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <img src="/cat.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Prayer Categories</h3>
            <p className="text-gray-600">
              Focused prayers for healing, deliverance, advancement, dominion, and more
            </p>
          </div>

          {/* Bible Study Tools */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <img src="/story.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bible Study Tools</h3>
            <p className="text-gray-600">
              Access powerful study resources to deepen your scriptural knowledge.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <img src="/progress.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Tracker</h3>
            <p className="text-gray-600">
              Visualize your spiritual journey with beautiful progress tracking and milestones
            </p>
          </div>

          {/* Hymns & Worship */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <img src="/hymns.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hymns & Worship</h3>
            <p className="text-gray-600">
              Explore a rich library of worship resources including hymns, contemporary songs,
              and inspirational sermons from trusted Christian leaders.
            </p>
          </div>

          {/* Cross-Device Sync */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <img src="/sync.svg" alt="prayer" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cross-Device Sync</h3>
            <p className="text-gray-600">
              Your prayers, notes, and progress automatically sync across all your devices
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;