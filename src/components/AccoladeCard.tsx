import React, { useState } from 'react';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Accolade {
  title: string;
  organization: string;
  year: string;
  description: string;
  link: string;
}

interface AccoladeCardProps {
  accolades: Accolade[];
}

const AccoladeCard: React.FC<AccoladeCardProps> = ({ accolades }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(accolades.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return accolades.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {getCurrentPageItems().map((accolade, index) => (
          <AnimatedSection
            key={`${currentPage}-${index}`}
            animation="fadeInUp"
            delay={index * 100}
          >
            <a
              href={accolade.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group block h-full"
            >
              <div className="flex items-start space-x-4 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-h-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {accolade.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-2">
                    {accolade.organization} • {accolade.year}
                  </p>
                  <p className="text-gray-600 line-clamp-3">{accolade.description}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0" />
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <AnimatedSection delay={400} className="flex justify-center items-center space-x-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  index === currentPage
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </AnimatedSection>
      )}
    </div>
  );
};

export default AccoladeCard;