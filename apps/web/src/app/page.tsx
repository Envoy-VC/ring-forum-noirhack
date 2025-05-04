import { CategorySelect, PopularTags } from '~/components';

const Home = () => {
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-col-reverse gap-6 px-4 py-12 lg:flex-row'>
      <div className='flex w-full basis-1/4'>
        <div className='mx-auto flex w-full max-w-xs flex-col gap-8'>
          <CategorySelect />
          <PopularTags />
        </div>
      </div>
      <div className='flex w-full basis-3/4 border'>content</div>
    </div>
  );
};

export default Home;
