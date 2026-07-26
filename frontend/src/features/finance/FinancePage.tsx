import { useState } from "react";
import { Icon } from "@/components/common/IconSprite";
import { AddExpenseForm } from "@/components/forms/AddExpenseForm";
import { AddGoalForm } from "@/components/forms/AddGoalForm";
import { useFinanceStore } from "./financeStore";
import {
  currentMonthPrefix,
  formatCurrency,
  sortedExpenses,
  totalForMonth,
} from "./financeLogic";

function GoalRow({
  id,
  name,
  targetAmount,
  savedAmount,
}: {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
}) {
  const addFunds = useFinanceStore((s) => s.addFunds);
  const removeGoal = useFinanceStore((s) => s.removeGoal);
  const [amount, setAmount] = useState("");
  const percent = Math.min(100, Math.round((savedAmount / targetAmount) * 100));

  function handleAddFunds() {
    const value = Number(amount);
    if (value > 0) {
      addFunds(id, value);
      setAmount("");
    }
  }

  return (
    <div className="goal-row">
      <div className="goal-info">
        <div className="goal-name">{name}</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="progress-label">
          {formatCurrency(savedAmount)} of {formatCurrency(targetAmount)} ·{" "}
          {percent}%
        </div>
      </div>
      <div className="goal-actions">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Add"
          className="task-datetime"
          style={{ width: 90 }}
        />
        <button className="calendar-today-btn" onClick={handleAddFunds}>
          Add funds
        </button>
        <button
          className="habit-remove"
          onClick={() => removeGoal(id)}
          aria-label={`Remove goal ${name}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function FinancePage() {
  const expenses = useFinanceStore((s) => s.expenses);
  const monthlyBudget = useFinanceStore((s) => s.monthlyBudget);
  const setMonthlyBudget = useFinanceStore((s) => s.setMonthlyBudget);
  const removeExpense = useFinanceStore((s) => s.removeExpense);
  const goals = useFinanceStore((s) => s.goals);

  const [budgetInput, setBudgetInput] = useState(String(monthlyBudget || ""));

  const monthPrefix = currentMonthPrefix();
  const spentThisMonth = totalForMonth(expenses, monthPrefix);
  const budgetPercent =
    monthlyBudget > 0
      ? Math.min(100, Math.round((spentThisMonth / monthlyBudget) * 100))
      : 0;
  const remaining = Math.max(0, monthlyBudget - spentThisMonth);

  function saveBudget() {
    const value = Number(budgetInput);
    if (!Number.isNaN(value)) setMonthlyBudget(value);
  }

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Chapters · Finance</div>
          <h1 className="serif">
            Know where it <em>goes</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;Beware of little expenses; a small leak will sink a great
            ship.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Monthly Budget
          </div>
        </div>
        <div className="progress-track" style={{ height: 8, marginBottom: 8 }}>
          <div
            className="progress-fill"
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
        <div className="progress-label" style={{ marginBottom: 16 }}>
          {formatCurrency(spentThisMonth)} spent of{" "}
          {formatCurrency(monthlyBudget)} · {formatCurrency(remaining)}{" "}
          remaining this month
        </div>
        <div className="reading-controls">
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Set monthly budget"
            className="task-datetime"
            style={{ width: 150 }}
          />
          <button className="calendar-today-btn" onClick={saveBudget}>
            Save budget
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Log an expense
          </div>
        </div>
        <AddExpenseForm />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Expenses
          </div>
          <span className="card-sub">{expenses.length}</span>
        </div>
        {expenses.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Nothing logged yet.
          </p>
        ) : (
          <div className="task-full-list">
            {sortedExpenses(expenses).map((expense) => (
              <div className="task-full-row" key={expense.id}>
                <div className="expense-category">{expense.category}</div>
                <div className="task-full-body">
                  <div className="task-full-title">{expense.description}</div>
                  <div className="task-time">{expense.date}</div>
                </div>
                <div className="expense-amount">
                  {formatCurrency(expense.amount)}
                </div>
                <button
                  className="habit-remove"
                  onClick={() => removeExpense(expense.id)}
                  aria-label={`Remove ${expense.description}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Add a savings goal
          </div>
        </div>
        <AddGoalForm />
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Savings Goals
          </div>
          <span className="card-sub">{goals.length}</span>
        </div>
        {goals.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            No goals yet — add one above.
          </p>
        ) : (
          <div className="goal-list">
            {goals.map((goal) => (
              <GoalRow key={goal.id} {...goal} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
