
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import CHAINS from '@yearn-finance/web-lib/utils/web3/chains';
import {useYearn} from '@common/contexts/useYearn';

import type {ReactElement} from 'react';
import type {TYearnVault} from '@common/types/yearn';

function	VaultsListEmpty({sortedVaultsToDisplay, currentCategory}: {sortedVaultsToDisplay: TYearnVault[], currentCategory: string}): ReactElement {
	const {safeChainID} = useChainID();
	const {isLoadingVaultList} = useYearn();

	if (isLoadingVaultList && sortedVaultsToDisplay.length === 0) {
		return (
			<div className={'flex h-96 w-full flex-col items-center justify-center py-2 px-10'}>
				<b className={'text-center text-lg'}>{'Loading data'}</b>
				<p className={'text-center text-neutral-600'}>
					{'We are retrieving the vault list for you.'}
				</p>
			</div>
		);
	} else if (!isLoadingVaultList && sortedVaultsToDisplay.length === 0 && safeChainID !== 1) {
		const	chainName = (CHAINS as any)[safeChainID]?.name || 'this network';
		return (
			<div className={'flex h-96 w-full flex-col items-center justify-center py-2 px-10'}>
				<b className={'text-center text-lg'}>{'👀 Where Vaults ser?'}</b>
				<p className={'text-center text-neutral-600'}>
					{`It seems we don’t have ${currentCategory} on ${chainName} (yet). Feel free to check out other vaults on ${chainName} or change network. New Vaults and strategies are added often, so check back later. Don’t be a stranger.`}
				</p>
			</div>
		);
	} else if (!isLoadingVaultList && sortedVaultsToDisplay.length === 0) {
		return (
			<div className={'flex h-96 w-full flex-col items-center justify-center py-2 px-10'}>
				<b className={'text-center text-lg'}>{'No data, reeeeeeeeeeee'}</b>
				<p className={'text-center text-neutral-600'}>
					{'There doesn’t seem to be anything here. It might be because you searched for a token in the wrong category - or because there’s a rodent infestation in our server room. You check the search box, we’ll check the rodents. Deal?'}
				</p>
			</div>
		);
	}
	return <div />;
}

export {VaultsListEmpty};
