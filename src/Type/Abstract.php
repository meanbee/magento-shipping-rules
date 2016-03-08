<?php
abstract class Type_Abstract
{
	private $comparators = array();

	/**
	 * [sanitiseValidValue description]
	 * @todo
	 * @param  mixed $validValue [description]
	 * @return mixed             [description]
	 */
	public abstract function sanitiseValidValue($validValue);

	/**
	 * [sanitiseVariableValue description]
	 * @todo
	 * @param  mixed $variableValue [description]
	 * @return mixed                [description]
	 */
	public abstract function sanitiseVariableValue($variableValue);

	/**
	 * [addComparator description]
	 * @todo
	 * @param  string $comparatorID [description]
	 * @return $this
	 */
	public function addComparator($comparatorID)
	{
		if (!$this->canBeHandledByComparator($comparatorID)) {
			array_push($thi->comparators, $comparatorID);
		}
		return $this;
	}

	/**
	 * [removeComparator description]
	 * @todo
	 * @param  string  $comparatorID [description]
	 * @param  boolean $bidi         [description]
	 * @return $this                 [description]
	 */
	public function removeComparator($comparatorID, $bidi = true)
	{
		if ($this->canBeHandledByComparator($comparatorID, $bidi)) {
			$this->comparators = array_diff($this->comparators, [$comparatorID]);
			if ($bidi) {
				$comparator = Register_Comparator::instance()->get($comparatorID);
				$typeID = Register_Type::instance()->find($this);
				$comparator->removeType($typeID, false);
			}
		}
		return $this;
	}

	/**
	 * [canbeHandledByComparator description]
	 * @todo
	 * @param  string  $comparatorID [description]
	 * @param  boolean $bidi         [description]
	 * @return boolean               [description]
	 */
	public function canBeHandledByComparator($comparatorID, $bidi = true)
	{
		if (in_array($comparatorID, $this->comparators)) {
			return true;
		}
		if ($bidi) {
			$typeID = Register_Type::instance()->find($this);
			return Register_Comparator::instance()->get($comparatorID)->canHandleType($typeID, false);
		}
		return false;
	}
}
