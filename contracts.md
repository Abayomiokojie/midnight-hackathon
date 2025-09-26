# Smart Contract Architecture

---

## 📜 ConsentContract

**State Variables**

- `patientConsents`

**Functions**

- `giveConsent(patient)`
- `revokeConsent(patient)`

---

## 💰 TokenContract

**State Variables**

- `balances`

**Functions**

- `rewardPatient(patient, amount)`
- `transferTokens(from, to, amount)`

---

## 🧪 TrialRegistry

**State Variables**

- `trials`
- `trialParticipants`

**Functions**

- `createTrial(trialId, metadata)`
- `enrollPatient(trialId, patient)`

---

## ⏱ MilestoneContract

**State Variables**

- `trialMilestones`
- `submissions`

**Functions**

- `submitMilestone(trialId, milestoneId, hash)`

---

## 🏦 FundingContract

**State Variables**

- `trialEscrow`
- `approvals`

**Functions**

- `fundTrial(trialId, amount)`
- `approveMilestone(milestoneId)`
- `releaseFunds(trialId, milestoneId)`
