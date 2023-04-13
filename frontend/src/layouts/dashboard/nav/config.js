import i18 from '../../../i18n'
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: i18.t('sidebar.home'),
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: i18.t('sidebar.resources'),
    path: '/dashboard/resources',
    icon: icon('ic_resources'),
  },
  {
    title: i18.t('sidebar.inspections'),
    path: '/dashboard/inspections',
    icon: icon('ic_inspections'),
  },
];

export default navConfig;
