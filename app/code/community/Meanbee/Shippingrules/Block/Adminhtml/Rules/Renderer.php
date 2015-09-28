<?php

class Meanbee_Shippingrules_Block_Adminhtml_Rules_Renderer
	extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract
{
	public function render(Varien_Object $row)
	{
		$conditions = $row->getConditions();
		return $this->asHtmlRecursive($conditions);
	}
	protected function asHtmlRecursive($condition)
    {
        $html = $condition->asString().'<ul id="'.$condition->getPrefix().'__'.$condition->getId().'__children" class="rule-param-children" style="padding-left: 1em">';
        foreach ($condition->getConditions() as $i => $child) {
            if ($i >= 5) {
                $html .='<li>⋮</li>';
                break;
            }
            $html .= '<li>'.$this->asHtmlRecursive($child).'</li>';
        }
        $html .= '</ul>';
        return $html;
    }
}
