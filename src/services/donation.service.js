import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js"

// Controller method to create a donation
export const createDonation = async (body) => {
    const { campaign_id, petition, testimony, account_id, customer_id, user_id, quotes, amount, total_amount, novelties, reasons } = body;
    console.log('body en createDonation', body);

    try {
        // 1. Create donation
        const donation = await model.DonationModel.create({
            campaign_id,
            petition,
            testimony,
            account_id,
            customer_id,
            user_id,
            quotes,
            amount,
            total_amount
        });

        // 2. Extract IDs and Create donation-novelty relationships
        const donationNovelties = novelties.map(novelty => ({
            donation_id: donation.id,
            novelty_id: novelty.id // Extraer el id del objeto
        }));
        await model.DonationNoveltyModel.bulkCreate(donationNovelties);

        // 3. Extract IDs and Create donation-reason relationships
        const donationReasons = reasons.map(reason => ({
            donation_id: donation.id,
            reason_id: reason.id // Extraer el id del objeto
        }));
        await model.DonationReasonModel.bulkCreate(donationReasons);

        return { data: donation, error: null, warning: null };
    } catch (e) {
        throw CustomError({ message: `Error al crear la donación`, code: 500, data: e.errors });
    }
};
