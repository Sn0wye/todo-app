import { Moon, Sun } from './IconComponents';
import { useSelectedCategory } from '../contexts/SelectedCategory';
import { useTheme } from '../contexts/Theme';
import { capitalizeFirstLetter } from '../helpers/utils';
import { useAuth } from '../contexts/AuthContext';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export default function Header() {
  const { selectedCategory } = useSelectedCategory();
  const { theme, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();

  function handleThemeToggle() {
    if (theme === 'light') {
      toggleTheme('dark');
      return;
    }
    if (theme === 'dark') {
      toggleTheme('light');
    }
  }

  return (
    <header className='flex items-center justify-between pt-4'>
      <h1 className='text-5xl font-bold'>
        {selectedCategory === 'all'
          ? 'All Tasks'
          : capitalizeFirstLetter(selectedCategory)}
      </h1>
      <div className='ml-auto flex items-center gap-2'>
        <button
          className='hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-lg p-2 transition-colors duration-300'
          onClick={handleThemeToggle}
          aria-label='Toggle Theme'
        >
          {theme === 'dark' ? (
            <Sun className='text-brand text-3xl ' />
          ) : (
            <Moon className='text-brand text-3xl' />
          )}
        </button>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <img
                className='w-8 h-8 rounded-full'
                src={user?.avatar || undefined}
              />
            }
          />
          <MenuList className='bg-zinc-700 p-4 rounded-md'>
            <MenuItem onClick={logOut}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}
