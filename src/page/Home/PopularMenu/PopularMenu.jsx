import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

  const [menu] = useMenu()
  const popular = menu.filter((item => item.category === 'popular'));
  return (
    <div>
      <section>
        <SectionTitle
          heading="Our Popular items"
          subHeading={'four our menu'}
        ></SectionTitle>
      </section>
      <div className="grid md:grid-cols-2 gap-4">
        {popular.map(item => (
          <MenuItem key={item} items={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
