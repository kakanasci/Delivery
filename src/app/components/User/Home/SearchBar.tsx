import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  busca: string;
  setBusca: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ busca, setBusca }) => {
  return (
    <div className="relative w-80">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  )
}

export default SearchBar;
