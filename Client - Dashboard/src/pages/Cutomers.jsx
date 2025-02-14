import { useCallback, useState } from 'react';
import useReactQuery from '../hooks/useReactQuery';
import MainSection from '../layouts/MainSection';
import { getUsers } from '../services/Axios/Requests/User';
import Pagination from '../components/Navigation/Pagination';
import CustomerSearchBar from '../components/Customer/CustomerSearchBar';
import TableBodyRow from '../components/Table/TableBodyRow';
import Table from '../components/Table/Table';
import AddCustomer from '../components/Customer/AddCustomer';
export default function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedUser, setSearchedUser] = useState(false);
  const { mainData: customers } = useReactQuery(
    ['Customers', currentPage],
    getUsers,
    {
      page: currentPage,
      limit: 2,
    },
  );

  const changePageHandler = useCallback((newPage) => {
    return setCurrentPage(newPage);
  }, []);

  return (
    <>
      <AddCustomer />
      <MainSection sectionTitle='لیست مشتریان ثبت شده'>
        <CustomerSearchBar setSearchedUser={setSearchedUser} />
        <div className='flex-auto px-0 pt-0 pb-2'>
          <div className='p-0 w-full px-3'>
            <Table
              tableHeadData={[
                'نام و نام خانوادگی',
                'شماره همراه',
                'تعداد سفارش های ثبت شده',
              ]}>
              {customers &&
                !searchedUser &&
                customers.users.map((eachCustomer, index) => {
                  return (
                    <TableBodyRow
                      key={eachCustomer._id}
                      name={eachCustomer.fullName}
                      phoneNubmer={eachCustomer.phoneNumber}
                      index={index}
                      currentPage={currentPage}
                    />
                  );
                })}
              {searchedUser && (
                <TableBodyRow
                  name={searchedUser.fullName}
                  phoneNubmer={searchedUser.phoneNumber}
                  index={0}
                  currentPage={currentPage}
                />
              )}
            </Table>
          </div>
          {!searchedUser && customers && (
            <Pagination
              dataLength={customers.totalUsersCount?.count}
              currentPage={currentPage}
              changePageHandler={changePageHandler}
            />
          )}
        </div>
      </MainSection>
    </>
  );
}
