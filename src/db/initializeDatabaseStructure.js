import {createTable} from './createTable';
import getDBConnection from './index';
import db from './index';
import {TABLE_NAMES} from './tableNames';
import {TableValueGenerator} from './tableValueGenerator';
import {TABLE_VALUES} from './tableValues';

export const initializeDatabaseStructure = async () => {
  try {
    // -------------------------------------------------------------------------------------------------
    const personal_details = await TableValueGenerator(
      TABLE_VALUES.personal_details,
    );
    await createTable(TABLE_NAMES.personal_details, personal_details);
    // -------------------------------------------------------------------------------------------------
    const roster_details = await TableValueGenerator(
      TABLE_VALUES.roster_details,
    );
    await createTable(TABLE_NAMES.roster_details, roster_details);

    // -------------------------------------------------------------------------------------------------
    const navdata_details = await TableValueGenerator(
      TABLE_VALUES.navdata_details,
    );
    await createTable(TABLE_NAMES.navdata_details, navdata_details);
    
  } catch (error) {
    console.log(error);
  }
};
