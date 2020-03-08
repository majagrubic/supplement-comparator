import React, { useState } from 'react';

import {
  EuiImage,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiStat,
  EuiTitle,
  EuiBadge,
  EuiSpacer,
  EuiDescriptionList,
  EuiBasicTable,
} from '@elastic/eui';
import { euiPaletteColorBlind } from '@elastic/eui/lib/services';

import Selector from './Selector';

export function Content(props) {
  const [item, setItem] = useState(null);

  const createListItems = () => {
    const ingredients = item.all_ingredients.map(ingredient => {
      const name = ingredient.name.split(', ');
      if (name.length > 1) {
        return name[1];
      }
      return ingredient.name;
    });
    const description = ingredients.join(', ');
    return [{ title: '', description }];
  };
  const listItems = item ? createListItems() : [];
  const palette = euiPaletteColorBlind();
  const ingredientsColumns = [
    {
      field: 'name',
      name: 'Name',
      sortable: true,
      'data-test-subj': 'nameCell',
      render: name => {
        if (name.includes('Protein') || name.includes('protein')) {
          return (
            <span style={{ fontWeight: 'bold', color: palette[2] }}>
              {name}
            </span>
          );
        }
        return <span style={{ fontWeight: 'bold' }}>{name}</span>;
      }
    },
    {
      field: 'nameAmount',
      name: 'Amount',
      truncateText: true,
      render: item => {
        const { name, amount } = item;
        if (name.includes('Protein') || name.includes('protein')) {
          return (
            <span
              style={{ fontWeight: 'bold', color: euiPaletteColorBlind()[2] }}
            >
              {amount}
            </span>
          );
        }
        return <span>{amount}</span>;
      }
    },
    {
      field: 'dv',
      name: '% Daily Value',
      mobileOptions: {
        show: false
      }
    }
  ];
  const tableItems = item
    ? item.ingredients.map(ingredient => {
        const { name, amount, dv } = ingredient;
        return { name, nameAmount: { name, amount }, dv };
      })
    : null;
  const renderItem = () => {
    const servingsPerContainer =
      item.servings_per_container_actual || item.servings_per_container || '-';
    return (
      <React.Fragment>
        <EuiSpacer size="s" />
        <EuiBadge color="#02E6AF">{item.brand}</EuiBadge>
        <EuiFlexGroup justifyContent="spaceAround" className="imgContainer">
          <EuiFlexItem
            grow={false}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <EuiImage
              size="s"
              hasShadow
              alt="Supplement image"
              url={item.img}
              className="content_img"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule size="full" margin="s" />
        <EuiStat
          title={servingsPerContainer}
          description="Servings Per Container"
        />
        <EuiStat title={item.serving_size_actual} description="Serving Size" />
        <EuiHorizontalRule size="full" margin="s" />
        <EuiTitle>
          <h6>Ingredients</h6>
        </EuiTitle>
        <EuiBasicTable
          items={tableItems}
          rowHeader="firstName"
          columns={ingredientsColumns}
        />
        <EuiHorizontalRule size="full" margin="s" />
        <EuiTitle>
          <h6>All Ingredients</h6>
        </EuiTitle>
        <EuiDescriptionList listItems={listItems} align="left" compressed />
      </React.Fragment>
    );
  };
  const onItemSelected = item => {
    setItem(item);
  };
  return (
    <EuiPanel>
      <Selector items={props.items} onItemSelected={onItemSelected} />
      {item ? renderItem() : null}
    </EuiPanel>
  );
}

export default Content;
